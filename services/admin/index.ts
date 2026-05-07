import { api } from "@/lib/api";

export const adminService = {
  async listUsers(): Promise<any[]> {
    const response = await api.get("/admin/users");
    return response.data;
  },

  async updateUserWallet(userId: string, amount: number): Promise<void> {
    await api.patch(`/admin/users/${userId}/wallet`, { amount });
  },

  async listSubscriptionRequests(): Promise<any[]> {
    const response = await api.get("/admin/subscriptions/requests");
    return response.data;
  },

  async approveSubscription(subscriptionId: string): Promise<void> {
    await api.post(`/admin/subscriptions/${subscriptionId}/approve`);
  },

  async getStats(): Promise<any> {
    const response = await api.get("/admin/stats");
    return response.data;
  },

  async listAdmins(): Promise<any[]> {
    const response = await api.get("/admin/admins");
    return response.data;
  },

  async updateProfile(data: any): Promise<any> {
    const response = await api.patch("/admin/profile", data);
    return response.data;
  },

  async createAdmin(data: any): Promise<any> {
    const response = await api.post("/admin/admins", data);
    return response.data;
  },
};
