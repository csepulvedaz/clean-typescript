import { ProductEntity, SearchParams } from './entity';
import { ProductValue } from './value';

export interface IProductRepository {
	insertProduct(product: ProductValue): Promise<ProductEntity | null>;
  getProducts(searchParams: SearchParams): Promise<ProductEntity[] | null>;
}
