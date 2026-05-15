"use client";

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
import type { AdminUser } from "@/services/admin";
import { PencilEdit01Icon, UserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface AdminsTableCardProps {
  admins: AdminUser[];
  isLoading: boolean;
  onEdit: (admin: AdminUser) => void;
}

export function AdminsTableCard({
  admins,
  isLoading,
  onEdit,
}: AdminsTableCardProps) {
  if (isLoading) {
    return <TableSkeleton columns={4} />;
  }

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Lista de administradores</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">Administrador</TableHead>
              <TableHead>Utilizador</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead className="pr-4 text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {admins.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-10 text-center text-muted-foreground"
                >
                  Nenhum administrador encontrado.
                </TableCell>
              </TableRow>
            ) : (
              admins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell className="pl-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center  bg-primary/10">
                        <HugeiconsIcon
                          icon={UserIcon}
                          size={16}
                          className="text-primary"
                        />
                      </div>
                      <span className="font-medium">{admin.fullName}</span>
                    </div>
                  </TableCell>
                  <TableCell>@{admin.username}</TableCell>
                  <TableCell>
                    {admin.createdAt
                      ? new Date(admin.createdAt).toLocaleDateString("pt-AO")
                      : "-"}
                  </TableCell>
                  <TableCell className="pr-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(admin)}
                    >
                      <HugeiconsIcon icon={PencilEdit01Icon} size={14} />
                      Editar
                    </Button>
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
