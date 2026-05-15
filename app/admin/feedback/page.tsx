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
import { useFeedback } from "@/hooks/admin/use-feedback";
import { Feedback } from "@/services/feedback";
import {
  Bug01Icon,
  Delete02Icon,
  Idea01Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function AdminFeedbackPage() {
  const { feedbacks, isLoading, deleteFeedback } = useFeedback();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "BUG":
        return (
          <HugeiconsIcon
            icon={Bug01Icon}
            size={18}
            className="text-destructive"
          />
        );
      case "SUGGESTION":
        return (
          <HugeiconsIcon
            icon={Idea01Icon}
            size={18}
            className="text-warning"
          />
        );
      default:
        return (
          <HugeiconsIcon
            icon={InformationCircleIcon}
            size={18}
            className="text-info"
          />
        );
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case "BUG":
        return "Erro";
      case "SUGGESTION":
        return "Sugestão";
      default:
        return "Outro";
    }
  };

  return (
    <div className="space-y-6">
      {isLoading ? (
        <TableSkeleton columns={5} />
      ) : (
        <div className="border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-37.5">Tipo</TableHead>
                <TableHead>Usuário</TableHead>
                <TableHead>Mensagem</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feedbacks.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-10 text-muted-foreground"
                  >
                    Nenhum feedback recebido.
                  </TableCell>
                </TableRow>
              ) : (
                feedbacks.map((item: Feedback) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(item.type)}
                        <span className="font-medium text-xs">
                          {getTypeName(item.type)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm">
                          {item.userName || item.user?.fullName || "Anônimo"}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {item.email || item.user?.phone || "Sem contacto"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="text-sm line-clamp-2" title={item.message}>
                        {item.message}
                      </p>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString("pt-PT", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          if (confirm("Deseja remover este feedback?")) {
                            deleteFeedback(item.id!);
                          }
                        }}
                        className="text-destructive"
                      >
                        <HugeiconsIcon icon={Delete02Icon} size={18} />
                      </Button>
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
