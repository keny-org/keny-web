/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useAccountDeletionRequests } from "@/hooks/admin/use-account-deletion-requests";
import { CheckmarkCircle01Icon, UserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function AccountDeletionRequestsPage() {
  const { requests, isLoading, approveRequest, isApproving } =
    useAccountDeletionRequests();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return (
          <span className="px-2 py-1 bg-warning/10 text-warning text-[10px] font-bold border border-warning/20">
            PENDENTE
          </span>
        );
      case "APPROVED":
        return (
          <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold border border-primary/20">
            APROVADO
          </span>
        );
      case "COMPLETED":
        return (
          <span className="px-2 py-1 bg-success/10 text-success text-[10px] font-bold border border-success/20">
            CONCLUÍDO
          </span>
        );
      case "REJECTED":
        return (
          <span className="px-2 py-1 bg-destructive/10 text-destructive text-[10px] font-bold border border-destructive/20">
            REJEITADO
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 rounded-full bg-muted text-muted-foreground text-[10px] font-bold">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Pedidos de Apagar Conta</h3>

      {isLoading ? (
        <TableSkeleton columns={5} />
      ) : (
        <div className="border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Motivos</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data do Pedido</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-10 text-muted-foreground"
                  >
                    Nenhum pedido encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                requests.map((request: any) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-muted flex items-center justify-center">
                          <HugeiconsIcon
                            icon={UserIcon}
                            size={14}
                            className="text-muted-foreground"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {request.user?.fullName || "—"}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {request.user?.phone || request.user?.email || "—"}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs">
                        {(request.reasons || []).join(", ") || "—"}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        {new Date(request.createdAt).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {request.status === "PENDING" && (
                        <Button
                          size="sm"
                          className="gap-2"
                          onClick={() => approveRequest(request.id)}
                          disabled={isApproving}
                        >
                          <HugeiconsIcon
                            icon={CheckmarkCircle01Icon}
                            size={16}
                          />
                          Aprovar e apagar
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

