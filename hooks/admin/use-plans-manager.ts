"use client";

import { usePlans } from "@/hooks/admin/use-plans";
import { SubscriptionPlan } from "@/services/plans";
import { useState } from "react";
import { toast } from "sonner";

const createEmptyForm = (): SubscriptionPlan => ({
  id: "",
  title: "",
  price: "",
  description: "",
  features: [""],
  isPopular: false,
});

export function usePlansManager() {
  const {
    plans,
    isLoading,
    createPlan,
    isCreating,
    updatePlan,
    isUpdating,
    deletePlan,
  } = usePlans();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);
  const [formData, setFormData] = useState<SubscriptionPlan>(createEmptyForm);

  const isSubmitting = isCreating || isUpdating;

  const resetForm = () => {
    setFormData(createEmptyForm());
    setEditingPlan(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (plan: SubscriptionPlan) => {
    setEditingPlan(plan);
    setFormData(plan);
    setIsDialogOpen(true);
  };

  const handleOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      resetForm();
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ""] });
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const filteredFeatures = formData.features.filter((f) => f.trim() !== "");
      const data = { ...formData, features: filteredFeatures };

      if (editingPlan) {
        await updatePlan({ id: editingPlan.id, data });
      } else {
        await createPlan(data);
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error("Erro ao enviar");
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este plano?")) {
      await deletePlan(id);
    }
  };

  return {
    plans,
    isLoading,
    isDialogOpen,
    editingPlan,
    formData,
    isSubmitting,
    setFormData,
    handleOpenChange,
    openCreateDialog,
    openEditDialog,
    handleFeatureChange,
    addFeature,
    removeFeature,
    handleSubmit,
    handleDelete,
  };
}
