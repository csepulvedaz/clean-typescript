-- Para crear usuario y base de datos con postgreSQL
CREATE USER user WITH PASSWORD 'password';
CREATE DATABASE store;
GRANT ALL PRIVILEGES ON DATABASE store TO user;

-- El resto lo hace Sequelize (creación/actualización tablas)
