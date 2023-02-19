export interface ExternalProductEntity {
	external_id: string;
	product_id: string;
	sku: string;
	image: string;
	name: string;
	short_description: string;
	long_description: string;
	price: string;
	variants: any[];
}
