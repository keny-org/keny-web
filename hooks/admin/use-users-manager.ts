"use client";

import { useUsers } from "@/hooks/admin/use-users";
import { useState } from "react";

export function useUsersManager() {
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

  const openWalletDialog = (user: any) => {
    setSelectedUser(user);
    setIsWalletDialogOpen(true);
  };

  const filteredUsers = users.filter(
    (user: any) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm) ||
      (user.email &&
        user.email.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  return {
    users: filteredUsers,
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
  };
}
