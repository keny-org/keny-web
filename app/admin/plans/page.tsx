"use client";

import { PlanFormDialog } from "@/components/admin/plans/plan-form-dialog";
import { PlansTable } from "@/components/admin/plans/plans-table";
import { Button } from "@/components/ui/button";
import { usePlansManager } from "@/hooks/admin/use-plans-manager";
import { Add01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function PlansPage() {
  const {
    plans,
    isLoading,
    isDialogOpen,
    editingPlan,
    formData,
    isSubmitting,
    handleOpenChange,
    openCreateDialog,
    openEditDialog,
    handleFeatureChange,
    addFeature,
    removeFeature,
    handleSubmit,
    handleDelete,
    setFormData,
  } = usePlansManager();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">Gerenciar Planos</h3>
          <p className="text-muted-foreground">
            Configure os planos de assinatura e seus benefícios.
          </p>
        </div>

        <Button className="gap-2" onClick={openCreateDialog}>
          <HugeiconsIcon icon={Add01Icon} size={16} />
          Novo Plano
        </Button>
      </div>

      <PlansTable
        plans={plans}
        isLoading={isLoading}
        onEdit={openEditDialog}
        onDelete={handleDelete}
      />

      <PlanFormDialog
        isOpen={isDialogOpen}
        onOpenChange={handleOpenChange}
        editingPlan={editingPlan}
        formData={formData}
        onFormChange={setFormData}
        onFeatureChange={handleFeatureChange}
        onAddFeature={addFeature}
        onRemoveFeature={removeFeature}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
