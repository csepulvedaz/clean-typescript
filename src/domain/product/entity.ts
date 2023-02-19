export interface ProductEntity {
	product_id: string;
	parent_id?: string | null;
	init: boolean;
	external_id: string;
	search_text: string;
	name: string;
	price: number;
	image: string;
	json_product: object;
	sku: string;
	store_product_id: string;
}

export type ProductInput = Omit<ProductEntity, 'product_id'>;

export interface SearchParams {
	search_text?: string;
	price?: number;
	price_operator?: 'lt' | 'lte' | 'eq' | 'gt' | 'gte';
}
