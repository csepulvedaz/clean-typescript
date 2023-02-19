import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT as string;

export const CONFIG_POSTGRES = {
	host: process.env.HOST,
	user: process.env.DB_USER_POSTGRES as string,
	database: process.env.DATABASE_POSTGRES as string,
	password: process.env.DB_PASSWORD_POSTGRES,
	port: Number(process.env.DB_PORT),
};

export const CONFIG_SHOPIFY = {
	apikey: process.env.SHOPIFY_API_KEY as string,
	password: process.env.SHOPIFY_PASSWORD as string,
	shopname: process.env.SHOPIFY_SHOPNAME as string,
};

export const CONFIG_WOOCOMMERCE = {
	url: process.env.WOOCOMMERCE_URL as string,
	consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY as string,
	consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET as string,
};
