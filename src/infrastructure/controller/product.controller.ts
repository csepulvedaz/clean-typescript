import { Request, Response } from 'express';
import { ProductUseCase } from 'application/use-case/product';

export class ProductController {
	constructor(private productUseCase: ProductUseCase) {
		this.getProducts = this.getProducts.bind(this);
	}

	public async getProducts(req: Request, res: Response) {
		const data = req.query;
		const products = await this.productUseCase.getProducts(data);
		res.send({ products });
	}

	// public async insertProduct(req: Request, res: Response) {
	// 	const data = req.body;
	// 	const product = await this.productUseCase.insertProduct(data);
	// 	res.send({ product });
	// }
}
