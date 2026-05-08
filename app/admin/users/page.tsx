/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUsers } from "@/hooks/admin/use-users";
import {
  Coins01Icon,
  Search01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import { useState } from "react";

export default function UsersPage() {
  const { users, isLoading, updateWallet, isUpdatingWallet } = useUsers();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isWalletDialogOpen, setIsWalletDialogOpen] = useState(false);
  const [kcoinsAmount, setKcoinsAmount] = useState(0);

  const handleUpdateWallet = async () => {
    if (!selectedUser || kcoinsAmount <= 0) return;

    try {
      await updateWallet({ userId: selectedUser.id, amount: kcoinsAmount });
      setIsWalletDialogOpen(false);
      setKcoinsAmount(0);
    } catch (error) {
      // Error handled by hook
    }
  };

  const filteredUsers = users.filter(
    (user: any) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm) ||
      (user.email &&
        user.email.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Gerenciar Usuários</h3>
      </div>

      <div className="flex items-center gap-4 bg-card p-4  border">
        <div className="relative flex-1">
          <HugeiconsIcon
            icon={Search01Icon}
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Buscar por nome, telefone ou email..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  Carregando...
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-10 text-muted-foreground"
                >
                  Nenhum usuário encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user: any) => (
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
                        className="text-yellow-500"
                      />
                      <span className="font-bold">
                        {user.wallet?.kcoinsBalance || 0}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.subscriptions && user.subscriptions.length > 0 ? (
                      <span className="px-2 py-1  bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                        {user.subscriptions[0].plan.title}
                      </span>
                    ) : (
                      <span className="px-2 py-1  bg-secondary text-secondary-foreground text-xs font-medium">
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
                      onClick={() => {
                        setSelectedUser(user);
                        setIsWalletDialogOpen(true);
                      }}
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

      <Dialog open={isWalletDialogOpen} onOpenChange={setIsWalletDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar K-Coins</DialogTitle>
            <DialogDescription>
              Adicione K-Coins na carteira de {selectedUser?.fullName}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Quantidade de K-Coins</Label>
              <div className="relative">
                <HugeiconsIcon
                  icon={Coins01Icon}
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  id="amount"
                  type="number"
                  placeholder="Ex: 500"
                  className="pl-10"
                  value={kcoinsAmount}
                  onChange={(e) =>
                    setKcoinsAmount(parseInt(e.target.value) || 0)
                  }
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsWalletDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleUpdateWallet} disabled={isUpdatingWallet}>
              {isUpdatingWallet ? "Processando..." : "Confirmar Pagamento"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Label({
  htmlFor,
  children,
  className,
}: {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    >
      {children}
    </label>
  );
}
