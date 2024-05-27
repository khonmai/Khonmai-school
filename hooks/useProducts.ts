import useSWR from "swr";
import fecther from "@/lib/fetcher";

const useProducts = (id?: string) => {
  const url = id ? `/api/product/?id=${id}` : `/api/product`;
  const { data, error, isLoading, mutate } = useSWR(url, fecther);

  return { data, error, isLoading, mutate };
};

export default useProducts;
