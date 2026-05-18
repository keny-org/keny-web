import { api } from "@/lib/api";

export interface AdminUser {
  id: string;
  fullName: string;
  username: string;
  createdAt?: string;
}

export interface AdminFormInput {
  fullName: string;
  username: string;
  password?: string;
}

export interface AdminUserAccount {
  id: string;
  fullName: string;
  phone: string;
  email?: string | null;
  avatarUrl?: string | null;
  createdAt: string;
  wallet?: {
    kcoinsBalance: number;
  } | null;
  subscriptions?: Array<{
    plan: {
      title: string;
    };
  }>;
}

export interface AdminSubscriptionRequest {
  id: string;
  status: string;
  createdAt: string;
  user?: {
    fullName?: string;
    phone?: string;
  };
  plan?: {
    title?: string;
    price?: string;
  };
  payments?: Array<{
    reference?: string | null;
    value?: string | null;
  }>;
}

export interface AdminStats {
  counts: {
    totalUsers: number;
    totalAdmins: number;
    pendingSubscriptions: number;
    activeSubscriptions: number;
  };
  userGrowth: Array<{ date: string; count: number }>;
  subscriptionStats: Array<{ plan: string; count: number }>;
  recentRequests: AdminSubscriptionRequest[];
}

export interface AdminAccountDeletionRequest {
  id: string;
  status: string;
  reasons: string[];
  note?: string | null;
  createdAt: string;
  approvedAt?: string | null;
  processedAt?: string | null;
  user?: {
    id: string;
    fullName?: string;
    phone?: string;
    email?: string | null;
  } | null;
  approvedByAdmin?: {
    id: string;
    fullName?: string;
    username?: string;
  } | null;
}

export const adminService = {
  async listUsers(): Promise<AdminUserAccount[]> {
    const response = await api.get("/admin/users");
    return response.data;
  },

  async updateUserWallet(userId: string, amount: number): Promise<void> {
    await api.patch(`/admin/users/${userId}/wallet`, { amount });
  },

  async listSubscriptionRequests(): Promise<AdminSubscriptionRequest[]> {
    const response = await api.get("/admin/subscriptions/requests");
    return response.data;
  },

  async approveSubscription(subscriptionId: string): Promise<void> {
    await api.post(`/admin/subscriptions/${subscriptionId}/approve`);
  },

  async listAccountDeletionRequests(): Promise<AdminAccountDeletionRequest[]> {
    const response = await api.get("/admin/account-deletions/requests");
    return response.data;
  },

  async approveAccountDeletionRequest(requestId: string): Promise<void> {
    await api.post(`/admin/account-deletions/${requestId}/approve`);
  },

  async getStats(): Promise<AdminStats> {
    const response = await api.get("/admin/stats");
    return response.data;
  },

  async listAdmins(): Promise<AdminUser[]> {
    const response = await api.get("/admin/admins");
    return response.data;
  },

  async getProfile(): Promise<AdminUser> {
    const response = await api.get("/admin/profile");
    return response.data;
  },

  async updateProfile(data: AdminFormInput): Promise<AdminUser> {
    const response = await api.patch("/admin/profile", data);
    return response.data;
  },

  async createAdmin(data: Required<AdminFormInput>): Promise<AdminUser> {
    const response = await api.post("/admin/admins", data);
    return response.data;
  },

  async updateAdmin(id: string, data: AdminFormInput): Promise<AdminUser> {
    const response = await api.patch(`/admin/admins/${id}`, data);
    return response.data;
  },
};
