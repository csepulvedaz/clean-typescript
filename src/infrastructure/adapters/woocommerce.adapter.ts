import https from 'https';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { IExternalApi } from './externalApi';

import { CONFIG_WOOCOMMERCE } from 'application/config/environment';

export class WooCommerceAdapter implements IExternalApi {
	private client: WooCommerceRestApi;

	constructor() {
		const agent = new https.Agent({
			rejectUnauthorized: false,
		});

		this.client = new WooCommerceRestApi({
			url: CONFIG_WOOCOMMERCE.url,
			consumerKey: CONFIG_WOOCOMMERCE.consumerKey,
			consumerSecret: CONFIG_WOOCOMMERCE.consumerSecret,
			version: 'wc/v3',
			queryStringAuth: true,
			axiosConfig: { httpsAgent: agent },
		});
	}

	async getProducts(): Promise<any[]> {
		const { data } = await this.client.get('products');

		// Get variations for each product
		const products = await Promise.all(
			data?.map(async (product: any) => {
				const variantEndpoint = `products/${product.id}/variations`;
				const { data: variants } = await this.client.get(variantEndpoint);
				product.variants = variants;
				return product;
			}),
		);

		return products;
	}
}