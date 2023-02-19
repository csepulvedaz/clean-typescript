import { Router } from 'express';

import { ProductRepository } from '../repository/product.repository';
import { ProductUseCase } from 'application/use-case/product';
import { ProductController } from '../controller/product.controller';

const route = Router();
/**
 * Initialize repository
 */
const productRepo = new ProductRepository();

/**
 * Initialize use cases
 */

const productUseCase = new ProductUseCase(productRepo);

/**
 * Initialize product controller
 */

const productCtrl = new ProductController(productUseCase);

/**
 * Create routes
 */

route.get(`/`, productCtrl.getProducts);

export default route;
