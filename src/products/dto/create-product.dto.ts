export class CreateProductDto {
  name: string;
  price: number;
  description?: string;
  category_id: number;
  stock?: number;
}