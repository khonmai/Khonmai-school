import useSWR from "swr";
import fecther from "@/lib/fetcher";

const useSubdistrict = (district_code: string) => {
  const url = `/api/subdistrict?district_code=${district_code}`;
  const { data, error, isLoading, mutate } = useSWR(url, fecther);

  return { data, error, isLoading, mutate };
};

export default useSubdistrict;
