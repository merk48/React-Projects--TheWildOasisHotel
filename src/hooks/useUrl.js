import { useSearchParams } from "react-router-dom";

export function useUrl(paramKey) {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get(paramKey) || "";

  const updateValue = (newValue) => {
    const params = new URLSearchParams(searchParams);
    params.set(paramKey, newValue);

    // Reset page if changing filters/sort
    if (params.has("page")) params.set("page", "1");

    setSearchParams(params);
  };

  return [value, updateValue];
}
