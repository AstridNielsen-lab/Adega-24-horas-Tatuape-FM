export interface Product {
  id: string;
  name: string;
  price?: number;
  originalPrice?: number;
  description: string;
  imageUrl: string;
  category: string;
  inStock: boolean;
  volume?: string;
  isAlcoholic?: boolean;
  isTabacco?: boolean;
  temperature?: 'gelada' | 'ambiente';
}

export type ProductCategory = {
  id: string;
  name: string;
  products: Product[];
};