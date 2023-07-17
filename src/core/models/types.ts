import { RecommendedService } from "core/recommended-services/types";

export interface Model {
  modelId: string;
  brand: string;
  description: string;
  modelKg: number;
  modelYear: string;
  seatsQuantity: number;
  refrigerantType: string;
  engineOilType: string;
  oilBox: string;
  octane: number;
  createdAt: string;
  services: RecommendedService[];
}

export interface PaginatedModel extends Omit<Model, 'servicesRecommended'> {}
