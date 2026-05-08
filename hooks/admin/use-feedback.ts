import { feedbackService, Feedback } from "@/services/feedback";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useFeedback() {
  const queryClient = useQueryClient();

  const { data: feedbacks = [], isLoading } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: () => feedbackService.listAll(),
  });

  const deleteFeedbackMutation = useMutation({
    mutationFn: (id: string) => feedbackService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
      toast.success("Feedback removido!");
    },
    onError: () => {
      toast.error("Erro ao remover feedback.");
    },
  });

  return {
    feedbacks,
    isLoading,
    deleteFeedback: deleteFeedbackMutation.mutateAsync,
    isDeleting: deleteFeedbackMutation.isPending,
  };
}
