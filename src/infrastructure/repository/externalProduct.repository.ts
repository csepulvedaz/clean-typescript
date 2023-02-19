import { ShopifyAdapter } from '../adapters/shopify.adapter';
import { WooCommerceAdapter } from '../adapters/woocommerce.adapter';

import { ExternalProductEntity } from 'domain/external-product/entity';
import { IExternalProductRepository } from 'domain/external-product/repository';
import { ExternalProductValue } from 'domain/external-product/value';

type ApiClients = {
	[companyPrefix: string]: ShopifyAdapter | WooCommerceAdapter;
};

const company: ApiClients = {
	HeavenStore: new ShopifyAdapter(),
	MagicStore: new WooCommerceAdapter(),
};

export class ExternalProductRepository implements IExternalProductRepository {
	async getProducts(companyPrefix: string): Promise<[any, ExternalProductEntity[]] | null> {
		const store = company[companyPrefix];
		if (!store) {
			throw new Error(`Store "${companyPrefix}" not supported`);
		}
		try {
			const products = await store.getProducts();
			const formattedProducts = products.map((product: any) => {
				return new ExternalProductValue(product);
			});
			return [products, formattedProducts];
		} catch (err: any) {
			const message = err.message;
			console.log('[ExternalProductRepo]: ', message);
			throw new Error(`Error getting products: ${message}`);
		}
	}
}
