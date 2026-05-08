"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AdminFormInput, AdminUser } from "@/services/admin";

type AdminFormData = Required<AdminFormInput>;

interface AdminFormDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  editingAdmin: AdminUser | null;
  formData: AdminFormData;
  isSubmitting: boolean;
  onFormChange: (formData: AdminFormData) => void;
  onSubmit: (event: React.FormEvent) => void;
}

export function AdminFormDialog({
  isOpen,
  onOpenChange,
  editingAdmin,
  formData,
  isSubmitting,
  onFormChange,
  onSubmit,
}: AdminFormDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingAdmin ? "Editar administrador" : "Criar administrador"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label>Nome completo</Label>
            <Input
              required
              value={formData.fullName}
              onChange={(event) =>
                onFormChange({ ...formData, fullName: event.target.value })
              }
              placeholder="Nome do administrador"
            />
          </div>
          <div className="space-y-2">
            <Label>Utilizador</Label>
            <Input
              required
              value={formData.username}
              onChange={(event) =>
                onFormChange({ ...formData, username: event.target.value })
              }
              placeholder="username_admin"
            />
          </div>
          <div className="space-y-2">
            <Label>
              {editingAdmin
                ? "Nova senha (deixe vazio para manter)"
                : "Senha temporária"}
            </Label>
            <Input
              required={!editingAdmin}
              type="password"
              value={formData.password}
              onChange={(event) =>
                onFormChange({ ...formData, password: event.target.value })
              }
              placeholder="••••••••"
            />
          </div>
          <DialogFooter className="pt-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Salvando..."
                : editingAdmin
                  ? "Salvar alterações"
                  : "Criar admin"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
