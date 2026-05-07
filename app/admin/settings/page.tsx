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
import { adminService } from "@/services/admin";
import {
  ArrowRight01Icon,
  MoonIcon,
  Plug01Icon,
  Settings02Icon,
  Sun01Icon,
  UserAdd01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [admins, setAdmins] = useState<any[]>([]);
  const [profile, setProfile] = useState({
    fullName: "",
    username: "",
    password: "",
  });
  const [newAdmin, setNewAdmin] = useState({
    fullName: "",
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isAddAdminOpen, setIsAddAdminOpen] = useState(false);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const data = await adminService.listAdmins();
        setAdmins(data);
      } catch (error) {
        console.error("Erro ao carregar administradores:", error);
      }
    };
    fetchAdmins();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await adminService.updateProfile(profile);
      toast.success("Perfil atualizado com sucesso!");
      setProfile({ ...profile, password: "" });
    } catch (error) {
      toast.error("Erro ao atualizar perfil.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await adminService.createAdmin(newAdmin);
      toast.success("Novo administrador adicionado!");
      setIsAddAdminOpen(false);
      setNewAdmin({ fullName: "", username: "", password: "" });
      // Refresh list
      const data = await adminService.listAdmins();
      setAdmins(data);
    } catch (error) {
      toast.error("Erro ao adicionar administrador.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h3 className="text-xl font-bold">Configurações</h3>
        <p className="text-muted-foreground">
          Gerencie sua conta e as preferências do sistema.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Profile & Theme */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-card p-6 rounded-xl border space-y-6">
            <div className="flex items-center gap-2 border-b pb-4">
              <HugeiconsIcon
                icon={UserIcon}
                size={20}
                className="text-primary"
              />
              <h4 className="font-bold">Meu Perfil</h4>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="space-y-2">
                <Label>Nome Completo</Label>
                <Input
                  value={profile.fullName}
                  onChange={(e) =>
                    setProfile({ ...profile, fullName: e.target.value })
                  }
                  placeholder="Seu nome"
                />
              </div>
              <div className="space-y-2">
                <Label>Utilizador</Label>
                <Input
                  value={profile.username}
                  onChange={(e) =>
                    setProfile({ ...profile, username: e.target.value })
                  }
                  placeholder="Seu username"
                />
              </div>
              <div className="space-y-2">
                <Label>Nova Senha (deixe vazio para manter a atual)</Label>
                <Input
                  type="password"
                  value={profile.password}
                  onChange={(e) =>
                    setProfile({ ...profile, password: e.target.value })
                  }
                  placeholder="••••••••"
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </form>
          </div>

          <div className="bg-card p-6 rounded-xl border space-y-6">
            <div className="flex items-center gap-2 border-b pb-4">
              <HugeiconsIcon
                icon={Settings02Icon}
                size={20}
                className="text-primary"
              />
              <h4 className="font-bold">Preferências</h4>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Tema do Sistema</p>
                <p className="text-xs text-muted-foreground">
                  Escolha entre o modo claro e escuro.
                </p>
              </div>
              <div className="flex bg-muted p-1 rounded-lg">
                <button
                  onClick={() => setTheme("light")}
                  className={`p-2 rounded-md transition-all ${theme === "light" ? "bg-background shadow-sm text-primary" : "text-muted-foreground"}`}
                >
                  <HugeiconsIcon icon={Sun01Icon} size={18} />
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`p-2 rounded-md transition-all ${theme === "dark" ? "bg-background shadow-sm text-primary" : "text-muted-foreground"}`}
                >
                  <HugeiconsIcon icon={MoonIcon} size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Admin Management */}
        <div className="space-y-6">
          <div className="bg-card p-6 rounded-xl border space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">
                Administradores
              </h4>
              <Dialog open={isAddAdminOpen} onOpenChange={setIsAddAdminOpen}>
                <DialogTrigger asChild>
                  <button className="text-primary hover:bg-primary/10 p-1 rounded-md transition-colors">
                    <HugeiconsIcon icon={Plug01Icon} size={20} />
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adicionar Administrador</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddAdmin} className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label>Nome Completo</Label>
                      <Input
                        required
                        value={newAdmin.fullName}
                        onChange={(e) =>
                          setNewAdmin({ ...newAdmin, fullName: e.target.value })
                        }
                        placeholder="Nome do admin"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Utilizador</Label>
                      <Input
                        required
                        value={newAdmin.username}
                        onChange={(e) =>
                          setNewAdmin({ ...newAdmin, username: e.target.value })
                        }
                        placeholder="username_admin"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Senha Temporária</Label>
                      <Input
                        required
                        type="password"
                        value={newAdmin.password}
                        onChange={(e) =>
                          setNewAdmin({ ...newAdmin, password: e.target.value })
                        }
                        placeholder="••••••••"
                      />
                    </div>
                    <DialogFooter className="pt-4">
                      <Button
                        variant="outline"
                        type="button"
                        onClick={() => setIsAddAdminOpen(false)}
                      >
                        Cancelar
                      </Button>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Criando..." : "Criar Admin"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-3">
              {admins.map((admin) => (
                <div
                  key={admin.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/30"
                >
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <HugeiconsIcon
                      icon={UserIcon}
                      size={14}
                      className="text-primary"
                    />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-xs font-bold truncate">
                      {admin.fullName}
                    </p>
                    <p className="text-[10px] text-muted-foreground truncate">
                      @{admin.username}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 space-y-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <HugeiconsIcon
                icon={UserAdd01Icon}
                size={20}
                className="text-primary"
              />
            </div>
            <div>
              <p className="text-sm font-bold">Convide a Equipe</p>
              <p className="text-xs text-muted-foreground">
                Adicione outros membros para ajudar na gestão do KENY.
              </p>
            </div>
            <Button
              variant="link"
              className="p-0 h-auto text-primary text-xs gap-1 group"
              onClick={() => setIsAddAdminOpen(true)}
            >
              Adicionar agora{" "}
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
