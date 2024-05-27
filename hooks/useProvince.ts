import useSWR from "swr";
import fecther from "@/lib/fetcher";

const useProvince = () => {
  const url = `/api/province`;
  const { data, error, isLoading, mutate } = useSWR(url, fecther);

  return { data, error, isLoading, mutate };
};

export default useProvince;
