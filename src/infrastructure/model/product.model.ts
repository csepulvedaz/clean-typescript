import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from 'infrastructure/db/postgres';
import { ProductEntity } from 'domain/product/entity';

type ProductCreationAttributes = Optional<ProductEntity, 'product_id'>;

class Product extends Model<ProductEntity, ProductCreationAttributes> implements ProductEntity {
	public product_id!: string;
	public parent_id!: string | null;
	public init!: boolean;
	public external_id!: string;
	public search_text!: string;
	public name!: string;
	public price!: number;
	public image!: string;
	public json_product!: object;
	public sku!: string;
	public store_product_id!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	public readonly deletedAt!: Date;
}

Product.init(
	{
		product_id: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
		},
		parent_id: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		init: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		external_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		search_text: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		price: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		image: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		json_product: {
			type: DataTypes.JSONB,
			allowNull: false,
		},
		sku: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		store_product_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: 'Product',
		tableName: 'products',
		timestamps: true,
		paranoid: true,
	},
);

export default Product;
