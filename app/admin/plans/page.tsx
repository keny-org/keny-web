"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { usePlans } from "@/hooks/admin/use-plans";
import { SubscriptionPlan } from "@/services/plans";
import {
  Add01Icon,
  Delete02Icon,
  PencilEdit01Icon,
  Tick01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";

export default function PlansPage() {
  const {
    plans,
    isLoading,
    createPlan,
    isCreating,
    updatePlan,
    isUpdating,
    deletePlan,
  } = usePlans();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);
  const [formData, setFormData] = useState<SubscriptionPlan>({
    id: "",
    title: "",
    price: "",
    description: "",
    features: [""],
    isPopular: false,
  });

  const resetForm = () => {
    setFormData({
      id: "",
      title: "",
      price: "",
      description: "",
      features: [""],
      isPopular: false,
    });
    setEditingPlan(null);
  };

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const filteredFeatures = formData.features.filter((f) => f.trim() !== "");
      const data = { ...formData, features: filteredFeatures };

      if (editingPlan) {
        await updatePlan({ id: editingPlan.id, data });
      } else {
        await createPlan(data);
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      // Handled by hook
    }
  };

  const openEditModal = (plan: SubscriptionPlan) => {
    setEditingPlan(plan);
    setFormData(plan);
    setIsDialogOpen(true);
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ""] });
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">Gerenciar Planos</h3>
          <p className="text-muted-foreground">
            Configure os planos de assinatura e seus benefícios.
          </p>
        </div>

        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            if (!open) {
              setIsDialogOpen(false);
              resetForm();
            }
          }}
        >
          <DialogTrigger asChild>
            <Button
              className="gap-2"
              onClick={() => {
                resetForm();
                setIsDialogOpen(true);
              }}
            >
              <HugeiconsIcon icon={Add01Icon} size={16} />
              Novo Plano
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPlan ? "Editar Plano" : "Criar Novo Plano"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateOrUpdate} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="id">
                  ID do Plano (ex: free, pro, business)
                </Label>
                <Input
                  id="id"
                  value={formData.id}
                  onChange={(e) =>
                    setFormData({ ...formData, id: e.target.value })
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
                    setFormData({ ...formData, title: e.target.value })
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
                    setFormData({ ...formData, price: e.target.value })
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
                    setFormData({ ...formData, description: e.target.value })
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
                    onClick={addFeature}
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
                      onChange={(e) =>
                        handleFeatureChange(index, e.target.value)
                      }
                      placeholder="Ex: Acesso ilimitado"
                      required
                    />
                    {formData.features.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFeature(index)}
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
                    setFormData({ ...formData, isPopular: checked })
                  }
                />
                <Label htmlFor="isPopular">Plano Popular (Destaque)</Label>
              </div>

              <DialogFooter className="pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isCreating || isUpdating}>
                  {isCreating || isUpdating
                    ? "Salvando..."
                    : editingPlan
                      ? "Salvar Alterações"
                      : "Criar Plano"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className=" border bg-card">
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  Carregando planos...
                </TableCell>
              </TableRow>
            ) : plans.length === 0 ? (
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
                      <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold border border-primary/20">
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
                        onClick={() => openEditModal(plan)}
                        title="Editar"
                      >
                        <HugeiconsIcon icon={PencilEdit01Icon} size={18} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          if (
                            confirm(
                              "Tem certeza que deseja excluir este plano?",
                            )
                          ) {
                            deletePlan(plan.id);
                          }
                        }}
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
    </div>
  );
}
