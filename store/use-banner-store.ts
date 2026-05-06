import { create } from "zustand";
import { Banner } from "../types/banner";

interface BannerState {
  banners: Banner[];
  setBanners: (banners: Banner[]) => void;
  addBanner: (banner: Banner) => void;
  removeBanner: (id: string) => void;
  updateBanner: (banner: Banner) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useBannerStore = create<BannerState>((set) => ({
  banners: [],
  setBanners: (banners) => set({ banners }),
  addBanner: (banner) => set((state) => ({ banners: [banner, ...state.banners] })),
  removeBanner: (id) =>
    set((state) => ({ banners: state.banners.filter((b) => b.id !== id) })),
  updateBanner: (banner) =>
    set((state) => ({
      banners: state.banners.map((b) => (b.id === banner.id ? banner : b)),
    })),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
}));
