import { ExternalProductEntity } from './entity';

export interface IExternalProductRepository {
	getProducts(companyPrefix: string): Promise<[any, ExternalProductEntity[]] | null>;
}
