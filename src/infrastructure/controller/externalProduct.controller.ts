import { Request, Response } from 'express';
import { ExternalProductUseCase } from 'application/use-case/externalProduct';
import { ProductUseCase } from 'application/use-case/product';

export class ExternalProductController {
	constructor(private externalProductUseCase: ExternalProductUseCase, private productUseCase: ProductUseCase) {
		this.getProducts = this.getProducts.bind(this);
	}

	public async getProducts(req: Request, res: Response) {
		try {
			const companyPrefix = req.params.companyPrefix as string;
			if (!companyPrefix) {
				return res.status(400).json({ success: false, message: 'companyPrefix is required' });
			}

			const [products, formattedProducts] = (await this.externalProductUseCase.getProducts(companyPrefix)) ?? [];

			// Add products to the database
			const productsPromises = products?.map((product: any) => this.productUseCase.insertProduct(product)) ?? [];
			await Promise.all(productsPromises);

			res.status(200).json({
				success: true,
				message: 'OK',
				result: {
					count: formattedProducts?.length,
					items: formattedProducts,
				},
			});
		} catch (err) {
			res.status(500).json({
				success: false,
				message: 'Error retrieving products',
				error: (err as Error).message,
			});
		}
	}
}
