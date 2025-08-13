import { useQuery } from "@tanstack/react-query";
import { readCabins } from "../../../services/apiCabins";
import { readCabinsKey } from "../../../utils/queryConstants";

export default function useCabins() {
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
