import useSWR from "swr";
import fecther from "@/lib/fetcher";

const useStudents = (id?: string) => {
  const url = id ? `/api/student/?id=${id}` : `/api/student`;
  const { data, error, isLoading, mutate } = useSWR(url, fecther);

  return { data, error, isLoading, mutate };
};

export default useStudents;
