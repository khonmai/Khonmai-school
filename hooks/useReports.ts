import useSWR from "swr";
import fecther from "@/lib/fetcher";

const useOrders = (rp_type: string, date?: string) => {
  const url = `/api/reports/daily/?date=${date}`;
  const { data, error, isLoading, mutate } = useSWR(url, fecther);

  return { data, error, isLoading, mutate };
};

export default useOrders;
