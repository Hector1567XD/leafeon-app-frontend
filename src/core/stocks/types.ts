export interface InputStock
{
  productId: string;
  agencyRif: string;
  onStock: number;
  minCapacity: number;
  maxCapacity: number;
};

export interface Stock extends InputStock {
  shortNameProduct: string;
  createdAt: string;
}
