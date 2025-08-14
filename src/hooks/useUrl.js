import { useCallback, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * useUrl(paramKey, options)
 *
 * options:
 *  - type: 'string' | 'number' | 'boolean' | 'array'  (default: 'string')
 *  - defaultValue: default typed value when param missing (default: null)
 *  - pageParamName: the page param key (default: 'page')
 *  - resetPageOnChange: whether changing this param should reset page to 1 (default: true)
 *  - writeDefaultToUrl: if true, write defaultValue into the URL when the param is missing (default: false)
 *
 * Returns: [value, setValue, searchParams]
 * - value: parsed/typed value
 * - setValue: (newVal | updaterFn) => void
 * - searchParams: the raw URLSearchParams object (read-only)
 */
export function useUrl(paramKey, options = {}) {
  const {
    type = "string",
    defaultValue = null,
    pageParamName = "page",
    resetPageOnChange = true,
    writeDefaultToUrl = false,
  } = options;

  const [searchParams, setSearchParams] = useSearchParams();

  const raw = searchParams.get(paramKey);

  const parse = useCallback(
    (val) => {
      if (val === null) return defaultValue;
      if (type === "number") {
        const n = Number(val);
        return Number.isFinite(n) ? n : defaultValue;
      }
      if (type === "boolean") return val === "true";
      if (type === "array")
        return val === "" ? [] : String(val).split(",").filter(Boolean);
      return String(val);
    },
    [type, defaultValue]
  );

  const stringify = useCallback(
    (val) => {
      if (val === null || val === undefined) return null;
      if (type === "array")
        return Array.isArray(val) ? val.join(",") : String(val);
      return String(val);
    },
    [type]
  );

  const value = useMemo(() => parse(raw), [parse, raw]);

  // If requested, write the default into the URL once when the param is missing.
  useEffect(() => {
    if (!writeDefaultToUrl) return;
    if (raw !== null) return; // param already present, nothing to do

    // compute string form of defaultValue; if it's null/undefined/"" -> skip
    const s = stringify(defaultValue);
    if (s === null || s === "") return;

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set(paramKey, s);

      // keep page reset behaviour consistent when writing defaults for other filters
      if (resetPageOnChange && paramKey !== pageParamName) {
        params.set(pageParamName, "1");
      }

      return params;
    });
    // only run on mount / when raw/flags/defaultValue change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    raw,
    writeDefaultToUrl,
    defaultValue,
    paramKey,
    pageParamName,
    resetPageOnChange,
    setSearchParams,
  ]);

  const updateValue = useCallback(
    (updater) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        const currentTyped = parse(params.get(paramKey));
        const newVal =
          typeof updater === "function" ? updater(currentTyped) : updater;
        const s = stringify(newVal);

        if (s === null || s === "") {
          params.delete(paramKey);
        } else {
          params.set(paramKey, s);
        }

        // If asked to reset page when changing filters (and we're not setting page itself)
        if (resetPageOnChange && paramKey !== pageParamName) {
          params.set(pageParamName, "1");
        }

        return params;
      });
    },
    [
      setSearchParams,
      parse,
      paramKey,
      stringify,
      resetPageOnChange,
      pageParamName,
    ]
  );

  return [value, updateValue, searchParams];
}
