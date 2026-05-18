import { adminService } from "@/services/admin";
import { useQuery } from "@tanstack/react-query";

export function useDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => adminService.getStats(),
  });

  return {
    stats,
    isLoading,
  };
}
