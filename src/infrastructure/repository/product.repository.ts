import { Op } from 'sequelize';

import { ProductEntity, SearchParams } from 'domain/product/entity';
import { IProductRepository } from 'domain/product/repository';
import { ProductValue } from 'domain/product/value';

import ProductModel from '../model/product.model';

export class ProductRepository implements IProductRepository {
	async getProducts(searchParams: SearchParams): Promise<ProductEntity[] | null> {
		const { search_text, price, price_operator } = searchParams;

		const whereClause: any = {};

		if (search_text) {
			whereClause.name = {
				[Op.like]: `%${search_text}%`,
			};
		}

		if (price && price_operator) {
			whereClause.price = {
				[Op[price_operator]]: price,
			};
		}

		try {
			const products = await ProductModel.findAll({
				where: whereClause,
			});
			return products;
		} catch (err) {
			const message = (err as Error).message;
			console.log('[ExternalProductRepo]: ', message);
			throw new Error(`Error getting products: ${message}`);
		}
	}

	async insertProduct(product: ProductValue): Promise<ProductEntity | null> {
		try {
			// If the product already exists, a new one will not be created.
			const existentProduct = await ProductModel.findOne({ where: { external_id: product.external_id } });
			if (existentProduct) {
				return existentProduct;
			}
			const newProduct = await ProductModel.create(product);
			return newProduct;
		} catch (err: any) {
			const message = err.message;
			console.log('[ExternalProductRepo]: ', message);
			throw new Error(`Error creating products: ${message}`);
		}
	}
}
