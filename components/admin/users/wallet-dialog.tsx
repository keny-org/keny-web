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
import { Label } from "@/components/ui/label";
import { Coins01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface WalletDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  selectedUser: any;
  amount: number;
  onAmountChange: (amount: number) => void;
  onConfirm: () => void;
  isSubmitting: boolean;
}

export function WalletDialog({
  isOpen,
  onOpenChange,
  selectedUser,
  amount,
  onAmountChange,
  onConfirm,
  isSubmitting,
}: WalletDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
                value={amount}
                onChange={(e) => onAmountChange(parseInt(e.target.value) || 0)}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onConfirm} disabled={isSubmitting}>
            {isSubmitting ? "Processando..." : "Confirmar Pagamento"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
