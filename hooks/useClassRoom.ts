import useSWR from "swr";
import fecther from "@/lib/fetcher";

const useClassRoom = (id?: string) => {
  const url = id ? `/api/classroom/?id=${id}` : `/api/classroom`;
  const { data, error, isLoading, mutate } = useSWR(url, fecther);

  return { data, error, isLoading, mutate };
};

export default useClassRoom;
