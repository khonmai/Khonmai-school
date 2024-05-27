import useSWR from "swr";
import fecther from "@/lib/fetcher";

const useTrip = (id?: string) => {
  const url = id ? `/api/trip/?id=${id}` : `/api/trip`;
  const { data, error, isLoading, mutate } = useSWR(url, fecther);

  return { data, error, isLoading, mutate };
};

export default useTrip;
