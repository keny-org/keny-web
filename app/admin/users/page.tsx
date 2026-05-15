"use client";

import { UsersTableCard } from "@/components/admin/users/users-table-card";
import { WalletDialog } from "@/components/admin/users/wallet-dialog";
import { Input } from "@/components/ui/input";
import { useUsersManager } from "@/hooks/admin/use-users-manager";
import { Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function UsersPage() {
  const {
    users,
    isLoading,
    searchTerm,
    setSearchTerm,
    selectedUser,
    isWalletDialogOpen,
    setIsWalletDialogOpen,
    kcoinsAmount,
    setKcoinsAmount,
    handleUpdateWallet,
    isUpdatingWallet,
    openWalletDialog,
  } = useUsersManager();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Gerenciar Usuários</h3>
      </div>

      <div className="flex items-center gap-4 bg-card p-4 border">
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

      <UsersTableCard
        users={users}
        isLoading={isLoading}
        onPay={openWalletDialog}
      />

      <WalletDialog
        isOpen={isWalletDialogOpen}
        onOpenChange={setIsWalletDialogOpen}
        selectedUser={selectedUser}
        amount={kcoinsAmount}
        onAmountChange={setKcoinsAmount}
        onConfirm={handleUpdateWallet}
        isSubmitting={isUpdatingWallet}
      />
    </div>
  );
}
