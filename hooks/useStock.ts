import useSWR from "swr";
import fecther from "@/lib/fetcher";

const useStock = (id?: string) => {
  const url = id ? `/api/stock/?id=${id}` : `/api/stock`;
  const { data, error, isLoading, mutate } = useSWR(url, fecther);

  return { data, error, isLoading, mutate };
};

export default useStock;
