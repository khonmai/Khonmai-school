import useSWR from "swr";
import fecther from "@/lib/fetcher";

const useTeachers = (id?: string) => {
  const url = id ? `/api/teacher/?id=${id}` : `/api/teacher`;
  const { data, error, isLoading, mutate } = useSWR(url, fecther);

  return { data, error, isLoading, mutate };
};

export default useTeachers;
