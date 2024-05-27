import useSWR from "swr";
import fecther from "@/lib/fetcher";

const useCategory = (id?: string) => {
  const url = id ? `/api/category/?id=${id}` : `/api/category`;
  const { data, error, isLoading, mutate } = useSWR(url, fecther);

  return { data, error, isLoading, mutate };
};

export default useCategory;
