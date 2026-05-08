"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { BannerFormData } from "@/hooks/banners/use-banner-manager";
import type { Banner } from "@/types/banner";
import {
  Add01Icon,
  Cancel01Icon,
  Image01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";

interface BannerFormDialogProps {
  isOpen: boolean;
  editingBanner: Banner | null;
  formData: BannerFormData;
  previewUrl: string | null;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  isSubmitting: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onFormChange: (formData: BannerFormData) => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearFile: () => void;
  onSubmit: (event: React.FormEvent) => void;
}

export function BannerFormDialog({
  isOpen,
  editingBanner,
  formData,
  previewUrl,
  fileInputRef,
  isSubmitting,
  isCreating,
  isUpdating,
  onOpenChange,
  onFormChange,
  onFileChange,
  onClearFile,
  onSubmit,
}: BannerFormDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>
            {editingBanner ? "Editar Banner" : "Criar Novo Banner"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4 pt-4">
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="relative flex h-32 w-full max-w-75 items-center justify-center overflow-hidden border-2 border-dashed bg-muted">
              {previewUrl ? (
                <>
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                  {!editingBanner && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6"
                      onClick={onClearFile}
                    >
                      <HugeiconsIcon icon={Cancel01Icon} size={12} />
                    </Button>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <HugeiconsIcon icon={Image01Icon} size={32} />
                  <span className="text-xs">Nenhuma imagem selecionada</span>
                </div>
              )}
            </div>

            {!editingBanner && (
              <div className="w-full">
                <Label htmlFor="banner-file" className="cursor-pointer">
                  <div className="flex items-center justify-center gap-2 border px-4 py-2 transition-colors hover:bg-muted">
                    <HugeiconsIcon icon={Add01Icon} size={16} />
                    Selecionar Imagem
                  </div>
                </Label>
                <Input
                  id="banner-file"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={onFileChange}
                  required={!editingBanner}
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(event) =>
                onFormChange({ ...formData, title: event.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtítulo</Label>
            <Input
              id="subtitle"
              value={formData.subtitle}
              onChange={(event) =>
                onFormChange({ ...formData, subtitle: event.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tag">Tag</Label>
              <Input
                id="tag"
                value={formData.tag}
                onChange={(event) =>
                  onFormChange({ ...formData, tag: event.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="order">Ordem</Label>
              <Input
                id="order"
                type="number"
                value={formData.order}
                onChange={(event) =>
                  onFormChange({
                    ...formData,
                    order: parseInt(event.target.value) || 0,
                  })
                }
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) =>
                onFormChange({ ...formData, isActive: checked })
              }
            />
            <Label htmlFor="isActive">Ativo</Label>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isCreating || isUpdating
                ? editingBanner
                  ? "Salvando..."
                  : "Criando..."
                : editingBanner
                  ? "Salvar Alterações"
                  : "Criar Banner"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
