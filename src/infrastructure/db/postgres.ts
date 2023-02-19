import { Sequelize } from 'sequelize-typescript';
import { CONFIG_POSTGRES } from 'application/config/environment';

export const sequelize = new Sequelize(CONFIG_POSTGRES.database, CONFIG_POSTGRES.user, CONFIG_POSTGRES.password, {
	dialect: 'postgres',
	host: CONFIG_POSTGRES.host,
	port: CONFIG_POSTGRES.port,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
});

export async function dbInit() {
	await sequelize.authenticate();
	console.log('DB postgres connected');
}
