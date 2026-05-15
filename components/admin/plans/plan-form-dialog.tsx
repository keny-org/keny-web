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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SubscriptionPlan } from "@/services/plans";
import { Add01Icon, Delete02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface PlanFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingPlan: SubscriptionPlan | null;
  formData: SubscriptionPlan;
  onFormChange: (data: SubscriptionPlan) => void;
  onFeatureChange: (index: number, value: string) => void;
  onAddFeature: () => void;
  onRemoveFeature: (index: number) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export function PlanFormDialog({
  isOpen,
  onOpenChange,
  editingPlan,
  formData,
  onFormChange,
  onFeatureChange,
  onAddFeature,
  onRemoveFeature,
  onSubmit,
  isSubmitting,
}: PlanFormDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125 p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>
            {editingPlan ? "Editar Plano" : "Criar Novo Plano"}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[80vh]">
          <form onSubmit={onSubmit} className="space-y-4 p-6 pt-2">
            <div className="space-y-2">
              <Label htmlFor="id">ID do Plano (ex: free, pro, business)</Label>
              <Input
                id="id"
                value={formData.id}
                onChange={(e) =>
                  onFormChange({ ...formData, id: e.target.value })
                }
                required
                disabled={!!editingPlan}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  onFormChange({ ...formData, title: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Preço (ex: Grátis, 5.000 Kz/mês)</Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) =>
                  onFormChange({ ...formData, price: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  onFormChange({ ...formData, description: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Benefícios / Funcionalidades</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={onAddFeature}
                  className="h-8 gap-1 text-xs"
                >
                  <HugeiconsIcon icon={Add01Icon} size={14} />
                  Adicionar
                </Button>
              </div>
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={feature}
                    onChange={(e) => onFeatureChange(index, e.target.value)}
                    placeholder="Ex: Acesso ilimitado"
                    required
                  />
                  {formData.features.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveFeature(index)}
                      className="shrink-0 text-destructive"
                    >
                      <HugeiconsIcon icon={Delete02Icon} size={16} />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Switch
                id="isPopular"
                checked={formData.isPopular}
                onCheckedChange={(checked) =>
                  onFormChange({ ...formData, isPopular: checked })
                }
              />
              <Label htmlFor="isPopular">Plano Popular (Destaque)</Label>
            </div>

            <DialogFooter className="pt-4 px-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "Salvando..."
                  : editingPlan
                    ? "Salvar Alterações"
                    : "Criar Plano"}
              </Button>
            </DialogFooter>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
