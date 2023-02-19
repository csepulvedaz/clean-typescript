import { IExternalProductRepository } from 'domain/external-product/repository';

export class ExternalProductUseCase {
	constructor(private readonly externalProductRepository: IExternalProductRepository) {}

	public getProducts = async (companyPrefix: string) => {
		return await this.externalProductRepository.getProducts(companyPrefix);
	};
}
