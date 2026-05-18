import { adminService } from "@/services/admin";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAccountDeletionRequests() {
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["account-deletion-requests"],
    queryFn: () => adminService.listAccountDeletionRequests(),
  });

  const approveMutation = useMutation({
    mutationFn: (id: string) => adminService.approveAccountDeletionRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account-deletion-requests"] });
      toast.success("Pedido aprovado e conta apagada.");
    },
    onError: () => {
      toast.error("Erro ao aprovar pedido.");
    },
  });

  return {
    requests,
    isLoading,
    approveRequest: approveMutation.mutateAsync,
    isApproving: approveMutation.isPending,
  };
}

