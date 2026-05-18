import { Feedback, feedbackService } from "@/services/feedback";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export function useFeedbackForm() {
  const [formData, setFormData] = useState<Feedback>({
    userName: "",
    email: "",
    message: "",
    type: "BUG",
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const submitMutation = useMutation({
    mutationFn: (data: Feedback) => feedbackService.submit(data),
    onSuccess: () => {
      setIsSuccess(true);
      toast.success("Feedback enviado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao enviar feedback.");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitMutation.mutate(formData);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({
      userName: "",
      email: "",
      message: "",
      type: "BUG",
    });
  };

  const updateField = <K extends keyof Feedback>(field: K, value: Feedback[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return {
    formData,
    isSubmitting: submitMutation.isPending,
    isSuccess,
    handleSubmit,
    handleReset,
    updateField,
  };
}
