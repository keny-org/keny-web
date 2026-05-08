import { adminService } from "@/services/admin";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useSubscriptionRequests() {
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["subscription-requests"],
    queryFn: () => adminService.listSubscriptionRequests(),
  });

  const approveMutation = useMutation({
    mutationFn: (id: string) => adminService.approveSubscription(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription-requests"] });
      toast.success("Subscrição aprovada com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao aprovar subscrição.");
    },
  });

  return {
    requests,
    isLoading,
    approveSubscription: approveMutation.mutateAsync,
    isApproving: approveMutation.isPending,
  };
}
