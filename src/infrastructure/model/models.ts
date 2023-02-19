import ProductModel from './product.model';

export async function syncModels() {
	try {
		await ProductModel.sync({ alter: true });
	} catch (e) {
		console.log(e);
	}
}
