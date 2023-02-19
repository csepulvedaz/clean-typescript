import Shopify, { IProduct } from 'shopify-api-node';
import { IExternalApi } from './externalApi';

import { CONFIG_SHOPIFY } from 'application/config/environment';

export class ShopifyAdapter implements IExternalApi {
	private client: Shopify;

	constructor() {
		this.client = new Shopify({
			shopName: CONFIG_SHOPIFY.shopname,
			apiKey: CONFIG_SHOPIFY.apikey,
			password: CONFIG_SHOPIFY.password,
		});
	}

	async getProducts(): Promise<IProduct[]> {
		const products = await this.client.product.list();
		return products;
	}
}