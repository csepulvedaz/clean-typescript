import express, { Express, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'module-alias/register';
import listEndpoints from 'express-list-endpoints';

// Config
import { PORT } from 'application/config/environment';
import { dbInit } from 'infrastructure/db/postgres';
import { syncModels } from 'infrastructure/model/models';

// Routes
import productRoute from 'infrastructure/routes/product.route';
import externalProductRoute from 'infrastructure/routes/externalProduct.route';

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json());

app.get('/healthcheck', (_, res: Response) => res.status(200).send({ status: 'OK' }));
app.use('/products', productRoute);
app.use('/search', externalProductRoute);

dbInit().then();
syncModels().then();

// List all endpoints
app.use('/', (_, res: Response) => {
	const endpoints = listEndpoints(app)
		.map(
			(endpoint) =>
				`${endpoint.methods.join(', ')} <a href="http://localhost:${PORT}${endpoint.path}">${endpoint.path}</a>`,
		)
		.join('\n');
	res.send(`<pre>${endpoints}</pre>`);
});

app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
