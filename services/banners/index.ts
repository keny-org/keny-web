import { Banner, CreateBannerInput } from "../../types/banner";
import { api } from "@/lib/api";

export const bannerService = {
  async listAll(): Promise<Banner[]> {
    const response = await api.get("/banners");
    return response.data;
  },

  async create(data: CreateBannerInput): Promise<Banner> {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.subtitle) formData.append("subtitle", data.subtitle);
    if (data.tag) formData.append("tag", data.tag);
    if (data.isActive !== undefined)
      formData.append("isActive", String(data.isActive));
    if (data.order !== undefined) formData.append("order", String(data.order));
    formData.append("file", data.file);

    const response = await api.post("/banners", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/banners/${id}`);
  },

  async update(id: string, data: Partial<Banner>): Promise<Banner> {
    const response = await api.patch(`/banners/${id}`, data);
    return response.data;
  },
};
