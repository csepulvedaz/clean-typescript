import { ExternalProductEntity } from './entity';

export class ExternalProductValue implements ExternalProductEntity {
	external_id: string;
	product_id: string;
	sku: string;
	image: string;
	name: string;
	short_description: string;
	long_description: string;
	price: string;
	variants: any[];

	constructor(externalProduct: any) {
		this.external_id = externalProduct.id.toString() ?? externalProduct.id;
		this.product_id = externalProduct.sku ?? externalProduct.id;
		this.sku = externalProduct.sku ?? '';
		this.image = externalProduct.images?.[0]?.src ?? '';
		this.name = externalProduct.name ?? externalProduct.title;
		this.short_description = externalProduct.short_description ?? '';
		this.long_description = externalProduct.description ?? externalProduct.body_html;
		this.price = externalProduct.price ?? '';
		this.variants =
			externalProduct.variants?.map((variant: any) => ({
				legacyResourceId: variant.id.toString() ?? variant.id,
				inventoryQuantity: variant.stock_quantity ?? variant.inventory_quantity,
				selectedOptions:
					variant.attributes?.map((attr: any) => ({
						name: attr.name,
						value: attr.option,
					})) ?? {},
				displayName: variant.name ?? variant.title,
				price: variant.price,
			})) ?? [];
	}
}
