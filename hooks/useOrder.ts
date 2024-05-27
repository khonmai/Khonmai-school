import useSWR from "swr";
import fecther from "@/lib/fetcher";

const useOrder = (id?: string) => {
  const url = id ? `/api/order/?id=${id}` : `/api/order`;
  const { data, error, isLoading, mutate } = useSWR(url, fecther);

  return { data, error, isLoading, mutate };
};

export default useOrder;
