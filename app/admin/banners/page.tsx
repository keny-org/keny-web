"use client";

import { BannerFormDialog } from "@/components/admin/banners/banner-form-dialog";
import { BannersPageHeader } from "@/components/admin/banners/banners-page-header";
import { BannersTableCard } from "@/components/admin/banners/banners-table-card";
import { useBannerManager } from "@/hooks/banners/use-banner-manager";

export default function BannersPage() {
  const bannerManager = useBannerManager();

  return (
    <div className="space-y-6">
      <BannersPageHeader onCreate={bannerManager.openCreateDialog} />

      <BannersTableCard
        banners={bannerManager.banners}
        isLoading={bannerManager.isLoading}
        onEdit={bannerManager.openEditDialog}
        onToggleStatus={bannerManager.toggleBannerStatus}
        onDelete={bannerManager.removeBanner}
      />

      <BannerFormDialog
        isOpen={bannerManager.isDialogOpen}
        editingBanner={bannerManager.editingBanner}
        formData={bannerManager.formData}
        previewUrl={bannerManager.previewUrl}
        fileInputRef={bannerManager.fileInputRef}
        isSubmitting={bannerManager.isSubmitting}
        isCreating={bannerManager.isCreating}
        isUpdating={bannerManager.isUpdating}
        onOpenChange={(isOpen) => {
          if (isOpen) {
            bannerManager.setIsDialogOpen(true);
            return;
          }
          bannerManager.closeDialog();
        }}
        onFormChange={bannerManager.setFormData}
        onFileChange={bannerManager.handleFileChange}
        onClearFile={bannerManager.clearSelectedFile}
        onSubmit={bannerManager.handleSubmit}
      />
    </div>
  );
}
