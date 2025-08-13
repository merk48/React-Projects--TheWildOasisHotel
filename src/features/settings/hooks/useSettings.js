import { useQuery } from "@tanstack/react-query";
import { readSettingsKey } from "../../../utils/constants/queryConstants";
import { getSettings } from "../../../services/apiSettings";

export function useSettings() {
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({
    queryKey: [readSettingsKey],
    queryFn: getSettings,
  });
  return { isLoading, error, settings };
}
