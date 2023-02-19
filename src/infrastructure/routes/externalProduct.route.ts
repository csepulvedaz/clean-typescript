import { Router } from 'express';

import { ExternalProductRepository } from '../repository/externalProduct.repository';
import { ExternalProductUseCase } from 'application/use-case/externalProduct';
import { ExternalProductController } from '../controller/externalProduct.controller';

import { ProductRepository } from '../repository/product.repository';
import { ProductUseCase } from 'application/use-case/product';

const route = Router();
/**
 * Initialize repository
 */
const externalProductRepo = new ExternalProductRepository();
const productRepo = new ProductRepository();

/**
 * Initialize use cases
 */

const externalProductUseCase = new ExternalProductUseCase(externalProductRepo);
const productUseCase = new ProductUseCase(productRepo);

/**
 * Initialize product controller
 */

const externalProductCtrl = new ExternalProductController(externalProductUseCase, productUseCase);

/**
 * Create routes
 */

route.get(`/:companyPrefix`, externalProductCtrl.getProducts);

export default route;
