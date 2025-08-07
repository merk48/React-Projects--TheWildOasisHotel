import { useQuery } from "@tanstack/react-query";
import { readCabins } from "../../../services/apiCabins";
import { readCabinsKey } from "../../../utils/queryConstants";

export function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: [readCabinsKey],
    queryFn: readCabins,
  });

  return { isLoading, cabins, error };
}
