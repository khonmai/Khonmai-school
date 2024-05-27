import useSWR from "swr";
import fecther from "@/lib/fetcher";

const useDistrict = (province_code: string) => {
  const url = `/api/district?province_code=${province_code}`;
  const { data, error, isLoading, mutate } = useSWR(url, fecther);

  return { data, error, isLoading, mutate };
};

export default useDistrict;
