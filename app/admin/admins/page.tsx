"use client";

import { AdminFormDialog } from "@/components/admin/admins/admin-form-dialog";
import { AdminSummaryCard } from "@/components/admin/admins/admin-summary-card";
import { AdminsTableCard } from "@/components/admin/admins/admins-table-card";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/hooks/admin/use-admin";
import type { AdminFormInput, AdminUser } from "@/services/admin";
import { Add01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";

const createEmptyForm = (): Required<AdminFormInput> => ({
  fullName: "",
  username: "",
  password: "",
});

export default function AdminsPage() {
  const {
    admins,
    isLoadingAdmins,
    createAdmin,
    isCreatingAdmin,
    updateAdmin,
    isUpdatingAdmin,
  } = useAdmin();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<AdminUser | null>(null);
  const [formData, setFormData] =
    useState<Required<AdminFormInput>>(createEmptyForm);

  const isSubmitting = isCreatingAdmin || isUpdatingAdmin;

  const resetDialog = () => {
    setEditingAdmin(null);
    setFormData(createEmptyForm());
  };

  const openCreateDialog = () => {
    resetDialog();
    setIsDialogOpen(true);
  };

  const openEditDialog = (admin: AdminUser) => {
    setEditingAdmin(admin);
    setFormData({
      fullName: admin.fullName,
      username: admin.username,
      password: "",
    });
    setIsDialogOpen(true);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setIsDialogOpen(isOpen);
    if (!isOpen) {
      resetDialog();
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (editingAdmin) {
      await updateAdmin({
        id: editingAdmin.id,
        data: {
          fullName: formData.fullName,
          username: formData.username,
          ...(formData.password ? { password: formData.password } : {}),
        },
      });
    } else {
      await createAdmin(formData);
    }

    handleOpenChange(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="grid gap-4 md:grid-cols-3">
          <AdminSummaryCard totalAdmins={admins.length} />
        </div>
        <Button onClick={openCreateDialog}>
          <HugeiconsIcon icon={Add01Icon} size={16} />
          Novo admin
        </Button>
      </div>

      <AdminsTableCard
        admins={admins}
        isLoading={isLoadingAdmins}
        onEdit={openEditDialog}
      />

      <AdminFormDialog
        isOpen={isDialogOpen}
        onOpenChange={handleOpenChange}
        editingAdmin={editingAdmin}
        formData={formData}
        isSubmitting={isSubmitting}
        onFormChange={setFormData}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
