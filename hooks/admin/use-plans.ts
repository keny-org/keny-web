import { planService, SubscriptionPlan } from "@/services/plans";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function usePlans() {
  const queryClient = useQueryClient();

  const { data: plans = [], isLoading } = useQuery({
    queryKey: ["plans"],
    queryFn: () => planService.listAll(),
  });

  const createPlanMutation = useMutation({
    mutationFn: (data: SubscriptionPlan) => planService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      toast.success("Plano criado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao criar plano.");
    },
  });

  const updatePlanMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<SubscriptionPlan> }) =>
      planService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      toast.success("Plano atualizado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao atualizar plano.");
    },
  });

  const deletePlanMutation = useMutation({
    mutationFn: (id: string) => planService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      toast.success("Plano removido com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao remover plano.");
    },
  });

  return {
    plans,
    isLoading,
    createPlan: createPlanMutation.mutateAsync,
    isCreating: createPlanMutation.isPending,
    updatePlan: updatePlanMutation.mutateAsync,
    isUpdating: updatePlanMutation.isPending,
    deletePlan: deletePlanMutation.mutateAsync,
    isDeleting: deletePlanMutation.isPending,
  };
}
