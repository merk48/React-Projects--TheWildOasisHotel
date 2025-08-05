import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../../services/apiCabins";
import { readCabinsKey } from "../constants";

export function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: [readCabinsKey],
    queryFn: getCabins,
  });

  return { isLoading, cabins, error };
}
