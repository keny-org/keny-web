"use client";

import { useBannersQuery } from "@/hooks/banners/use-banners-query";
import type { Banner } from "@/types/banner";
import { useRef, useState } from "react";

export interface BannerFormData {
  title: string;
  subtitle: string;
  tag: string;
  isActive: boolean;
  order: number;
  file: File | null;
}

const createEmptyForm = (): BannerFormData => ({
  title: "",
  subtitle: "",
  tag: "",
  isActive: true,
  order: 0,
  file: null,
});

export function useBannerManager() {
  const {
    banners,
    isLoading,
    createBanner,
    isCreating,
    deleteBanner,
    updateBanner,
    isUpdating,
  } = useBannersQuery();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [formData, setFormData] = useState<BannerFormData>(createEmptyForm);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isSubmitting = isCreating || isUpdating;

  const resetForm = () => {
    setFormData(createEmptyForm());
    setPreviewUrl(null);
    setEditingBanner(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (banner: Banner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title,
      subtitle: banner.subtitle || "",
      tag: banner.tag || "",
      isActive: banner.isActive,
      order: banner.order,
      file: null,
    });
    setPreviewUrl(banner.imageUrl);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFormData((current) => ({ ...current, file }));
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  const clearSelectedFile = () => {
    setFormData((current) => ({ ...current, file: null }));
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (editingBanner) {
      await updateBanner({
        id: editingBanner.id,
        data: {
          title: formData.title,
          subtitle: formData.subtitle,
          tag: formData.tag,
          isActive: formData.isActive,
          order: formData.order,
        },
      });
    } else {
      if (!formData.file) return;
      await createBanner({
        title: formData.title,
        subtitle: formData.subtitle,
        tag: formData.tag,
        isActive: formData.isActive,
        order: formData.order,
        file: formData.file,
      });
    }

    closeDialog();
  };

  const toggleBannerStatus = async (banner: Banner) => {
    await updateBanner({
      id: banner.id,
      data: { isActive: !banner.isActive },
    });
  };

  const removeBanner = async (banner: Banner) => {
    if (!confirm("Tem certeza que deseja excluir este banner?")) return;
    await deleteBanner(banner.id);
  };

  return {
    banners,
    isLoading,
    isDialogOpen,
    editingBanner,
    formData,
    previewUrl,
    fileInputRef,
    isSubmitting,
    isCreating,
    isUpdating,
    setFormData,
    setIsDialogOpen,
    openCreateDialog,
    openEditDialog,
    closeDialog,
    handleFileChange,
    clearSelectedFile,
    handleSubmit,
    toggleBannerStatus,
    removeBanner,
  };
}
