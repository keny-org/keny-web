import { adminService, type AdminFormInput } from "@/services/admin";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAdmin() {
  const queryClient = useQueryClient();

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["admin-profile"],
    queryFn: () => adminService.getProfile(),
  });

  const { data: admins = [], isLoading: isLoadingAdmins } = useQuery({
    queryKey: ["admins"],
    queryFn: () => adminService.listAdmins(),
  });

  const updateProfileMutation = useMutation({
    mutationFn: (data: AdminFormInput) => adminService.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-profile"] });
      toast.success("Perfil atualizado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao atualizar perfil.");
    },
  });

  const createAdminMutation = useMutation({
    mutationFn: (data: Required<AdminFormInput>) =>
      adminService.createAdmin(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
      toast.success("Novo administrador adicionado!");
    },
    onError: () => {
      toast.error("Erro ao adicionar administrador.");
    },
  });

  const updateAdminMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: AdminFormInput }) =>
      adminService.updateAdmin(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
      queryClient.invalidateQueries({ queryKey: ["admin-profile"] });
      toast.success("Administrador atualizado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao atualizar administrador.");
    },
  });

  return {
    profile,
    admins,
    isLoadingProfile,
    isLoadingAdmins,
    updateProfile: updateProfileMutation.mutateAsync,
    isUpdatingProfile: updateProfileMutation.isPending,
    createAdmin: createAdminMutation.mutateAsync,
    isCreatingAdmin: createAdminMutation.isPending,
    updateAdmin: updateAdminMutation.mutateAsync,
    isUpdatingAdmin: updateAdminMutation.isPending,
  };
}
