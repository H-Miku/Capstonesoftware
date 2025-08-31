import { useQuery } from "@tanstack/react-query";
import type { FitnessData } from "@shared/schema";

export function useFitnessData(date: string) {
  return useQuery<FitnessData>({
    queryKey: ["/api/fitness", date],
    enabled: !!date,
  });
}

export function useFitnessDataRange(startDate: string, endDate: string) {
  return useQuery<FitnessData[]>({
    queryKey: ["/api/fitness/range", startDate, endDate],
    enabled: !!startDate && !!endDate,
  });
}
