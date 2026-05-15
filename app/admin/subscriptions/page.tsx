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
import { useSubscriptionRequests } from "@/hooks/admin/use-subscription-requests";
import { CheckmarkCircle01Icon, UserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function SubscriptionRequestsPage() {
  const { requests, isLoading, approveSubscription, isApproving } =
    useSubscriptionRequests();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return (
          <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold border border-primary/20">
            ATIVA
          </span>
        );
      case "PENDING":
        return (
          <span className="px-2 py-1 bg-warning/10 text-warning text-[10px] font-bold border border-warning/20">
            PENDENTE
          </span>
        );
      case "CANCELED":
        return (
          <span className="px-2 py-1 bg-destructive/10 text-destructive text-[10px] font-bold border border-destructive/20">
            CANCELADA
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
      <h3 className="text-xl font-semibold">Pedidos de Subscrição</h3>

      {isLoading ? (
        <TableSkeleton columns={6} />
      ) : (
        <div className="border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Plano</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Pagamento</TableHead>
                <TableHead>Data do Pedido</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-10 text-muted-foreground"
                  >
                    Nenhum pedido de subscrição encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                requests.map((request: any) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8  bg-muted flex items-center justify-center">
                          <HugeiconsIcon
                            icon={UserIcon}
                            size={14}
                            className="text-muted-foreground"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {request.user?.fullName}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {request.user?.phone}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">
                          {request.plan?.title}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell>
                      {request.payments && request.payments.length > 0 ? (
                        <div className="text-xs">
                          <p className="font-medium">
                            Ref: {request.payments[0].reference || "---"}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {request.payments[0].value}
                          </p>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          Nenhum
                        </span>
                      )}
                    </TableCell>
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
                          onClick={() => approveSubscription(request.id)}
                          disabled={isApproving}
                        >
                          <HugeiconsIcon
                            icon={CheckmarkCircle01Icon}
                            size={16}
                          />
                          Aprovar
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
