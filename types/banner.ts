export interface Banner {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  tag: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBannerInput {
  title: string;
  subtitle?: string;
  tag?: string;
  isActive?: boolean;
  order?: number;
  file: File;
}
