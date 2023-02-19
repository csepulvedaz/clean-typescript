import { IProductRepository } from 'domain/product/repository';
import { SearchParams } from 'domain/product/entity';
import { ProductValue } from 'domain/product/value';

export class ProductUseCase {
	constructor(private readonly productRepository: IProductRepository) {}

	public insertProduct = async (product: any) => {
		// Create new product entity from the data
		const productValue = new ProductValue(product);
		// Save the product to the database
		const productCreated = await this.productRepository.insertProduct(productValue);
		// Check if the product has any variants
		if (product.variants) {
			// Loop through each variant and create a new product
			for (const variantData of product.variants) {
				const variantEntity = new ProductValue(variantData);
				// Set the product ID as the parent ID of the variant
				variantEntity.parent_id = productValue.product_id;
				// Save the variant to the database
				await this.productRepository.insertProduct(variantEntity);
			}
		}

		return productCreated;
	};

	public getProducts = async (searchParams: SearchParams) => {
		const products = await this.productRepository.getProducts(searchParams);
		return products;
	};
}
