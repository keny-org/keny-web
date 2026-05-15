"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { Coins01Icon, UserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";

interface UsersTableCardProps {
  users: any[];
  isLoading: boolean;
  onPay: (user: any) => void;
}

export function UsersTableCard({
  users,
  isLoading,
  onPay,
}: UsersTableCardProps) {
  if (isLoading) {
    return <TableSkeleton columns={6} />;
  }

  return (
    <div className="border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Usuário</TableHead>
            <TableHead>Contacto</TableHead>
            <TableHead>Carteira</TableHead>
            <TableHead>Assinatura</TableHead>
            <TableHead>Data de Cadastro</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-10 text-muted-foreground"
              >
                Nenhum usuário encontrado.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user: any) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-muted flex items-center justify-center overflow-hidden relative">
                      {user.avatarUrl ? (
                        <Image
                          src={user.avatarUrl}
                          alt={user.fullName}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <HugeiconsIcon
                          icon={UserIcon}
                          size={20}
                          className="text-muted-foreground"
                        />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{user.fullName}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.email || "Sem email"}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-sm">{user.phone}</p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={Coins01Icon}
                      size={18}
                      className="text-primary"
                    />
                    <span className="font-bold">
                      {user.wallet?.kcoinsBalance || 0}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {user.subscriptions && user.subscriptions.length > 0 ? (
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                      {user.subscriptions[0].plan.title}
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs font-medium">
                      Grátis
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <p className="text-sm text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => onPay(user)}
                  >
                    <HugeiconsIcon icon={Coins01Icon} size={16} />
                    Pagar
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
