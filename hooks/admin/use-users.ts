import { adminService } from "@/services/admin";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUsers() {
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => adminService.listUsers(),
  });

  const updateWalletMutation = useMutation({
    mutationFn: ({ userId, amount }: { userId: string; amount: number }) =>
      adminService.updateUserWallet(userId, amount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Carteira atualizada com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao atualizar carteira.");
    },
  });

  return {
    users,
    isLoading,
    updateWallet: updateWalletMutation.mutateAsync,
    isUpdatingWallet: updateWalletMutation.isPending,
  };
}
