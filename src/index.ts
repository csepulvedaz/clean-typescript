import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import 'module-alias/register';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
	res.send('Express + TypeScript Server');
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
