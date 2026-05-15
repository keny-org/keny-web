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
import { SubscriptionPlan } from "@/services/plans";
import {
  Delete02Icon,
  PencilEdit01Icon,
  Tick01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface PlansTableProps {
  plans: SubscriptionPlan[];
  isLoading: boolean;
  onEdit: (plan: SubscriptionPlan) => void;
  onDelete: (id: string) => void;
}

export function PlansTable({
  plans,
  isLoading,
  onEdit,
  onDelete,
}: PlansTableProps) {
  if (isLoading) {
    return <TableSkeleton columns={5} />;
  }

  return (
    <div className="border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Benefícios</TableHead>
            <TableHead>Destaque</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {plans.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-10 text-muted-foreground"
              >
                Nenhum plano encontrado.
              </TableCell>
            </TableRow>
          ) : (
            plans.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell className="font-bold">{plan.title}</TableCell>
                <TableCell>{plan.price}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    {plan.features.slice(0, 2).map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1 text-xs text-muted-foreground"
                      >
                        <HugeiconsIcon
                          icon={Tick01Icon}
                          size={12}
                          className="text-primary"
                        />
                        {feature}
                      </div>
                    ))}
                    {plan.features.length > 2 && (
                      <span className="text-[10px] text-muted-foreground italic">
                        +{plan.features.length - 2} mais...
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {plan.isPopular ? (
                    <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold border border-primary/20">
                      Popular
                    </span>
                  ) : (
                    <span className="text-muted-foreground text-[10px]">
                      Normal
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(plan)}
                      title="Editar"
                    >
                      <HugeiconsIcon icon={PencilEdit01Icon} size={18} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(plan.id)}
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
  );
}
