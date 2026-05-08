import { api } from "@/lib/api";

export interface Feedback {
  id?: string;
  userName?: string;
  email?: string;
  message: string;
  type: "BUG" | "SUGGESTION" | "OTHER";
  createdAt?: string;
  user?: {
    fullName: string;
    phone: string;
  };
}

export const feedbackService = {
  async submit(data: Feedback): Promise<Feedback> {
    const response = await api.post("/feedback", data);
    return response.data;
  },

  async listAll(): Promise<Feedback[]> {
    const response = await api.get("/feedback");
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/feedback/${id}`);
  },
};
