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
import { Image as ImageIcon, Plus, Power, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function BannersPage() {
  const {
    banners,
    isLoading,
    fetchBanners,
    createBanner,
    deleteBanner,
    toggleBannerStatus,
  } = useBanners();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newBanner, setNewBanner] = useState({
    title: "",
    subtitle: "",
    tag: "",
    isActive: true,
    order: 0,
    file: null as File | null,
  });

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBanner.file || !newBanner.title) return;

    try {
      await createBanner({
        ...newBanner,
        file: newBanner.file,
      });
      setIsDialogOpen(false);
      setNewBanner({
        title: "",
        subtitle: "",
        tag: "",
        isActive: true,
        order: 0,
        file: null,
      });
    } catch (error) {
      console.error(error);
      // toast handled in hook
    }
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

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Banner
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Novo Banner</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={newBanner.title}
                  onChange={(e) =>
                    setNewBanner({ ...newBanner, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtítulo</Label>
                <Input
                  id="subtitle"
                  value={newBanner.subtitle}
                  onChange={(e) =>
                    setNewBanner({ ...newBanner, subtitle: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tag">Tag</Label>
                  <Input
                    id="tag"
                    value={newBanner.tag}
                    onChange={(e) =>
                      setNewBanner({ ...newBanner, tag: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order">Ordem</Label>
                  <Input
                    id="order"
                    type="number"
                    value={newBanner.order}
                    onChange={(e) =>
                      setNewBanner({
                        ...newBanner,
                        order: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="file">Imagem</Label>
                <Input
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setNewBanner({
                      ...newBanner,
                      file: e.target.files?.[0] || null,
                    })
                  }
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="isActive"
                  checked={newBanner.isActive}
                  onCheckedChange={(checked) =>
                    setNewBanner({ ...newBanner, isActive: checked })
                  }
                />
                <Label htmlFor="isActive">Ativo</Label>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Criando..." : "Criar Banner"}
              </Button>
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
                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
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
                    <span className="px-2 py-1 rounded-full bg-secondary text-secondary-foreground text-xs">
                      {banner.tag || "N/A"}
                    </span>
                  </TableCell>
                  <TableCell>{banner.order}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${banner.isActive ? "bg-green-500" : "bg-red-500"}`}
                      />
                      {banner.isActive ? "Ativo" : "Inativo"}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          toggleBannerStatus(banner.id, banner.isActive)
                        }
                        title={banner.isActive ? "Desativar" : "Ativar"}
                      >
                        <Power
                          className={`h-4 w-4 ${banner.isActive ? "text-green-500" : "text-muted-foreground"}`}
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
                        className="text-destructive"
                      >
                        <Trash className="h-4 w-4" />
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
