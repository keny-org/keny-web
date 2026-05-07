"use client";

import { useEffect, useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { adminService } from "@/services/admin";
import { toast } from "sonner";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  CheckmarkCircle01Icon, 
  Clock01Icon, 
  UserIcon,
} from "@hugeicons/core-free-icons";

export default function SubscriptionsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const data = await adminService.listSubscriptionRequests();
      setRequests(data);
    } catch (error) {
      toast.error("Erro ao carregar pedidos de subscrição");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await adminService.approveSubscription(id);
      toast.success("Subscrição aprovada com sucesso");
      fetchRequests();
    } catch (error) {
      toast.error("Erro ao aprovar subscrição");
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold">Pedidos de Subscrição</h3>
        <p className="text-muted-foreground">
          Aprove ou rejeite pedidos de subscrição dos usuários.
        </p>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuário</TableHead>
              <TableHead>Plano</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Data do Pedido</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">Carregando...</TableCell>
              </TableRow>
            ) : requests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                  Nenhum pedido de subscrição encontrado.
                </TableCell>
              </TableRow>
            ) : (
              requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        <HugeiconsIcon icon={UserIcon} size={16} className="text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{request.user.fullName}</p>
                        <p className="text-xs text-muted-foreground">{request.user.phone}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{request.plan.title}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{request.plan.price}</span>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                       {request.status === 'PENDING' ? (
                         <>
                           <HugeiconsIcon icon={Clock01Icon} size={16} className="text-yellow-500" />
                           <span className="text-xs font-medium text-yellow-600">Pendente</span>
                         </>
                       ) : request.status === 'ACTIVE' ? (
                         <>
                           <HugeiconsIcon icon={CheckmarkCircle01Icon} size={16} className="text-green-500" />
                           <span className="text-xs font-medium text-green-600">Ativo</span>
                         </>
                       ) : (
                         <span className="text-xs font-medium text-muted-foreground">{request.status}</span>
                       )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {request.status === 'PENDING' && (
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 gap-1 text-green-600 border-green-200 hover:bg-green-50"
                          onClick={() => handleApprove(request.id)}
                        >
                          <HugeiconsIcon icon={CheckmarkCircle01Icon} size={14} />
                          Aprovar
                        </Button>
                      </div>
                    )}
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
