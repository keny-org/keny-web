"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useBanners } from "@/hooks/banners/use-banners";
import { Banner } from "@/types/banner";
import {
  Add01Icon,
  Cancel01Icon,
  Delete02Icon,
  Image01Icon,
  PencilEdit01Icon,
  PowerIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function BannersPage() {
  const {
    banners,
    isLoading,
    fetchBanners,
    createBanner,
    deleteBanner,
    toggleBannerStatus,
    updateBanner,
  } = useBanners();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    tag: "",
    isActive: true,
    order: 0,
    file: null as File | null,
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      tag: "",
      isActive: true,
      order: 0,
      file: null,
    });
    setPreviewUrl(null);
    setEditingBanner(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, file });
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingBanner) {
        await updateBanner(editingBanner.id, {
          title: formData.title,
          subtitle: formData.subtitle,
          tag: formData.tag,
          isActive: formData.isActive,
          order: formData.order,
        });
      } else {
        if (!formData.file) return;
        await createBanner({
          ...formData,
          file: formData.file,
        });
      }
      setIsDialogOpen(false);
      setEditingBanner(null);
    } catch (error) {
      console.error(error);
    }
  };

  const openEditModal = (banner: Banner) => {
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">Gerenciar Banners</h3>
          <p className="text-muted-foreground">
            Adicione, remova ou ative/desative banners do aplicativo.
          </p>
        </div>

        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => !open && closeDialog()}
        >
          <DialogTrigger asChild>
            <Button
              className="gap-2"
              onClick={() => {
                resetForm();
                setIsDialogOpen(true);
              }}
            >
              <HugeiconsIcon icon={Add01Icon} size={16} />
              Novo Banner
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingBanner ? "Editar Banner" : "Criar Novo Banner"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateOrUpdate} className="space-y-4 pt-4">
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="relative h-32 w-full max-w-[300px] rounded-lg overflow-hidden bg-muted flex items-center justify-center border-2 border-dashed">
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
                          onClick={() => {
                            setPreviewUrl(null);
                            setFormData({ ...formData, file: null });
                            if (fileInputRef.current)
                              fileInputRef.current.value = "";
                          }}
                        >
                          <HugeiconsIcon icon={Cancel01Icon} size={12} />
                        </Button>
                      )}
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <HugeiconsIcon icon={Image01Icon} size={32} />
                      <span className="text-xs">
                        Nenhuma imagem selecionada
                      </span>
                    </div>
                  )}
                </div>
                {!editingBanner && (
                  <div className="w-full">
                    <Label htmlFor="file" className="cursor-pointer">
                      <div className="flex items-center justify-center gap-2 px-4 py-2 border rounded-md hover:bg-muted transition-colors">
                        <HugeiconsIcon icon={Add01Icon} size={16} />
                        Selecionar Imagem
                      </div>
                    </Label>
                    <Input
                      id="file"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleFileChange}
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
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtítulo</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) =>
                    setFormData({ ...formData, subtitle: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tag">Tag</Label>
                  <Input
                    id="tag"
                    value={formData.tag}
                    onChange={(e) =>
                      setFormData({ ...formData, tag: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order">Ordem</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        order: parseInt(e.target.value) || 0,
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
                    setFormData({ ...formData, isActive: checked })
                  }
                />
                <Label htmlFor="isActive">Ativo</Label>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={closeDialog}
                >
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading
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
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-25">Imagem</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Tag</TableHead>
              <TableHead>Ordem</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {banners.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-10 text-muted-foreground"
                >
                  Nenhum banner encontrado.
                </TableCell>
              </TableRow>
            ) : (
              banners.map((banner) => (
                <TableRow key={banner.id}>
                  <TableCell>
                    <div className="relative h-12 w-20 rounded overflow-hidden bg-muted flex items-center justify-center">
                      {banner.imageUrl ? (
                        <Image
                          src={banner.imageUrl}
                          alt={banner.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <HugeiconsIcon
                          icon={Image01Icon}
                          size={24}
                          className="text-muted-foreground"
                        />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    <div>
                      {banner.title}
                      <p className="text-xs text-muted-foreground font-normal">
                        {banner.subtitle}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {banner.tag ? (
                      <span className="px-2 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                        {banner.tag}
                      </span>
                    ) : (
                      <span className="text-muted-foreground text-xs italic">
                        Sem tag
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{banner.order}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${banner.isActive ? "bg-primary shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "bg-destructive shadow-[0_0_8px_rgba(239,68,68,0.6)]"}`}
                      />
                      <span
                        className={
                          banner.isActive
                            ? "text-primary font-medium"
                            : "text-destructive font-medium"
                        }
                      >
                        {banner.isActive ? "Ativo" : "Inativo"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditModal(banner)}
                        title="Editar"
                      >
                        <HugeiconsIcon icon={PencilEdit01Icon} size={18} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          toggleBannerStatus(banner.id, banner.isActive)
                        }
                        title={banner.isActive ? "Desativar" : "Ativar"}
                      >
                        <HugeiconsIcon
                          icon={PowerIcon}
                          size={18}
                          className={
                            banner.isActive
                              ? "text-green-500"
                              : "text-muted-foreground"
                          }
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          if (
                            confirm(
                              "Tem certeza que deseja excluir este banner?",
                            )
                          ) {
                            deleteBanner(banner.id);
                          }
                        }}
                        className="text-destructive hover:bg-destructive/10"
                        title="Excluir"
                      >
                        <HugeiconsIcon icon={Delete02Icon} size={18} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
