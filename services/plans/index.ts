import { api } from "@/lib/api";

export interface SubscriptionPlan {
  id: string;
  title: string;
  price: string;
  description: string;
  features: string[];
  isPopular: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const planService = {
  async listAll(): Promise<SubscriptionPlan[]> {
    const response = await api.get("/subscription-plans");
    return response.data;
  },

  async create(data: SubscriptionPlan): Promise<SubscriptionPlan> {
    const response = await api.post("/subscription-plans", data);
    return response.data;
  },

  async update(id: string, data: Partial<SubscriptionPlan>): Promise<SubscriptionPlan> {
    const response = await api.patch(`/subscription-plans/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/subscription-plans/${id}`);
  },
};
