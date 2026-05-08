import { bannerService } from "@/services/banners";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CreateBannerInput, Banner } from "@/types/banner";

export function useBannersQuery() {
  const queryClient = useQueryClient();

  const { data: banners = [], isLoading } = useQuery({
    queryKey: ["banners"],
    queryFn: () => bannerService.listAll(),
  });

  const createBannerMutation = useMutation({
    mutationFn: (data: CreateBannerInput) => bannerService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      toast.success("Banner criado com sucesso");
    },
    onError: () => {
      toast.error("Erro ao criar banner");
    },
  });

  const deleteBannerMutation = useMutation({
    mutationFn: (id: string) => bannerService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      toast.success("Banner removido com sucesso");
    },
    onError: () => {
      toast.error("Erro ao remover banner");
    },
  });

  const updateBannerMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Banner> }) =>
      bannerService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      toast.success("Banner atualizado com sucesso");
    },
    onError: () => {
      toast.error("Erro ao atualizar banner");
    },
  });

  return {
    banners,
    isLoading,
    createBanner: createBannerMutation.mutateAsync,
    isCreating: createBannerMutation.isPending,
    deleteBanner: deleteBannerMutation.mutateAsync,
    isDeleting: deleteBannerMutation.isPending,
    updateBanner: updateBannerMutation.mutateAsync,
    isUpdating: updateBannerMutation.isPending,
  };
}
