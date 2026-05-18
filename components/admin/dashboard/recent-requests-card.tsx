"use client";

import { Button } from "@/components/ui/button";
import { AdminSubscriptionRequest } from "@/services/admin";
import { User02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

interface RecentRequestsCardProps {
  requests: AdminSubscriptionRequest[];
}

export function RecentRequestsCard({ requests }: RecentRequestsCardProps) {
  return (
    <div className="bg-card p-6 border">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">Pedidos de Subscrição Recentes</h3>
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/subscriptions">Ver Todos</Link>
        </Button>
      </div>

      <div className="space-y-4">
        {requests.length === 0 ? (
          <p className="text-center py-10 text-muted-foreground">
            Nenhum pedido pendente.
          </p>
        ) : (
          requests.map((req) => (
            <div
              key={req.id}
              className="flex items-center justify-between p-4 bg-muted/50 border border-transparent hover:border-border transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-primary/10 flex items-center justify-center">
                  <HugeiconsIcon
                    className="h-5 w-5 text-primary"
                    icon={User02Icon}
                  />
                </div>
                <div>
                  <p className="font-bold text-sm">{req.user?.fullName}</p>
                  <p className="text-xs text-muted-foreground">
                    {req.plan?.title} • {req.plan?.price}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">
                  {new Date(req.createdAt).toLocaleString()}
                </p>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border bg-warning/10 text-warning border-warning/20">
                  {req.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
