import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * useUrl(paramKey, options)
 *
 * options:
 *  - type: 'string' | 'number' | 'boolean' | 'array'  (default: 'string')
 *  - defaultValue: default typed value when param missing (default: null)
 *  - pageParamName: the page param key (default: 'page')
 *  - resetPageOnChange: whether changing this param should reset page to 1 (default: true)
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
  } = options;

  const [searchParams, setSearchParams] = useSearchParams();

  const raw = searchParams.get(paramKey);

  const parse = (val) => {
    if (val === null) return defaultValue;
    if (type === "number") {
      const n = Number(val);
      return Number.isFinite(n) ? n : defaultValue;
    }
    if (type === "boolean") return val === "true";
    if (type === "array")
      return val === "" ? [] : String(val).split(",").filter(Boolean);
    return String(val);
  };

  const stringify = (val) => {
    if (val === null || val === undefined) return null;
    if (type === "array")
      return Array.isArray(val) ? val.join(",") : String(val);
    return String(val);
  };

  const value = useMemo(() => parse(raw), [raw, type, defaultValue]);

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
    [paramKey, pageParamName, resetPageOnChange, setSearchParams]
  );

  return [value, updateValue, searchParams];
}
