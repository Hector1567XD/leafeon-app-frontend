export interface NoEcoProductsResponse {
  nonEcologicalPercentage: number;
}

export interface FakeClientsItem {
  clientDni: string;
  name: string;
  quantity: number;
}

export interface BestSellingProducts {
  productId: number;
  shortNameProduct: string;
  price: number;
  totalQuantitySold: number;
}

export interface FrecuentModelsByService {
  modelId: number;
  brand: string;
  description: number;
  totalOrder: number;
}

