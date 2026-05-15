import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import type { Banner } from "@/types/banner";
import {
  Delete02Icon,
  Image01Icon,
  PencilEdit01Icon,
  PowerIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";

interface BannersTableCardProps {
  banners: Banner[];
  isLoading: boolean;
  onEdit: (banner: Banner) => void;
  onToggleStatus: (banner: Banner) => void;
  onDelete: (banner: Banner) => void;
}

export function BannersTableCard({
  banners,
  isLoading,
  onEdit,
  onToggleStatus,
  onDelete,
}: BannersTableCardProps) {
  if (isLoading) {
    return <TableSkeleton columns={6} />;
  }

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Lista de banners</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-25 pl-4">Imagem</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Tag</TableHead>
              <TableHead>Ordem</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="pr-4 text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {banners.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-10 text-center text-muted-foreground"
                >
                  Nenhum banner encontrado.
                </TableCell>
              </TableRow>
            ) : (
              banners.map((banner) => (
                <TableRow key={banner.id}>
                  <TableCell className="pl-4">
                    <div className="relative flex h-12 w-20 items-center justify-center overflow-hidden  bg-muted">
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
                      <p className="text-xs font-normal text-muted-foreground">
                        {banner.subtitle}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {banner.tag ? (
                      <span className="bg-secondary rounded-full px-2 py-1 text-xs font-medium text-secondary-foreground">
                        {banner.tag}
                      </span>
                    ) : (
                      <span className="text-xs italic text-muted-foreground">
                        Sem tag
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{banner.order}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 ${
                          banner.isActive
                            ? "bg-primary shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                            : "bg-destructive shadow-[0_0_8px_rgba(239,68,68,0.6)]"
                        }`}
                      />
                      <span
                        className={
                          banner.isActive
                            ? "font-medium text-primary"
                            : "font-medium text-destructive"
                        }
                      >
                        {banner.isActive ? "Ativo" : "Inativo"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="pr-4 text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(banner)}
                        title="Editar"
                      >
                        <HugeiconsIcon icon={PencilEdit01Icon} size={18} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onToggleStatus(banner)}
                        title={banner.isActive ? "Desativar" : "Ativar"}
                      >
                        <HugeiconsIcon
                          icon={PowerIcon}
                          size={18}
                          className={
                            banner.isActive
                              ? "text-primary"
                              : "text-muted-foreground"
                          }
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(banner)}
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
      </CardContent>
    </Card>
  );
}
