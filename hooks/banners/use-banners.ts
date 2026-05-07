import { bannerService } from "@/services/banners";
import { useBannerStore } from "@/store/use-banner-store";
import { Banner, CreateBannerInput } from "@/types/banner";
import { useCallback } from "react";
import { toast } from "sonner";

export function useBanners() {
  const { 
    banners, 
    setBanners, 
    addBanner, 
    removeBanner, 
    updateBanner: updateStoreBanner, 
    isLoading, 
    setIsLoading 
  } = useBannerStore();

  const fetchBanners = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await bannerService.listAll();
      setBanners(data);
    } catch (error) {
      toast.error("Erro ao carregar banners");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [setBanners, setIsLoading]);

  const createBanner = useCallback(async (data: CreateBannerInput) => {
    setIsLoading(true);
    try {
      const banner = await bannerService.create(data);
      addBanner(banner);
      toast.success("Banner criado com sucesso");
      return banner;
    } catch (error) {
      toast.error("Erro ao criar banner");
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [addBanner, setIsLoading]);

  const deleteBanner = useCallback(async (id: string) => {
    try {
      await bannerService.delete(id);
      removeBanner(id);
      toast.success("Banner removido com sucesso");
    } catch (error) {
      toast.error("Erro ao remover banner");
      console.error(error);
    }
  }, [removeBanner]);

  const updateBanner = useCallback(async (id: string, data: Partial<Banner>) => {
    setIsLoading(true);
    try {
      const banner = await bannerService.update(id, data);
      updateStoreBanner(banner);
      toast.success("Banner atualizado com sucesso");
      return banner;
    } catch (error) {
      toast.error("Erro ao atualizar banner");
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [updateStoreBanner, setIsLoading]);

  const toggleBannerStatus = useCallback(async (id: string, currentStatus: boolean) => {
    try {
      const updatedBanner = await bannerService.update(id, { isActive: !currentStatus });
      updateStoreBanner(updatedBanner);
      toast.success(`Banner ${!currentStatus ? "ativado" : "desativado"} com sucesso`);
    } catch (error) {
      toast.error("Erro ao atualizar status do banner");
      console.error(error);
    }
  }, [updateStoreBanner]);

  return {
    banners,
    isLoading,
    fetchBanners,
    createBanner,
    deleteBanner,
    toggleBannerStatus,
    updateBanner,
  };
}
