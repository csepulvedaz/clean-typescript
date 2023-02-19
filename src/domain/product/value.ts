import { v4 as uuid } from 'uuid';
import { ProductEntity } from './entity';

export class ProductValue implements ProductEntity {
	product_id: string;
	parent_id: string | null;
	init: boolean;
	external_id: string;
	search_text: string;
	name: string;
	price: number;
	image: string;
	json_product: object;
	sku: string;
	store_product_id: string;

	constructor(product: any) {
		const externalId = product.id.toString() ?? product.id;
		const name = product.name ?? product.title ?? product.description;

		this.product_id = uuid();
		this.parent_id = product.parent_id ?? null;
		this.init = true;
		this.external_id = externalId;
		this.search_text = name;
		this.name = name;
		this.price = Number(product.price ?? 0.0);
		this.image = product.images?.[0]?.src ?? product.image?.src ?? '';
		this.json_product = product;
		this.sku = product.sku ?? product.id;
		this.store_product_id = externalId;
	}
}
