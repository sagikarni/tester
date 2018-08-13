import * as Sequelize from 'sequelize';
import keywords from './keywords';
import lists from './lists';
import products from './products';
import productsKeywords from './products-keywords';
import listsProducts from './lists-products';

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    dialect: process.env.DB_DIALECT
  }
);

// const db = {
//   Keywords: keywords(sequelize),
//   Lists: lists(sequelize),
//   ListProducts: listsProducts(sequelize),
//   Products: products(sequelize),
//   ProductsKeywords: productsKeywords(sequelize)
// };

const connect = () => sequelize.authenticate();

export { /*db,*/ sequelize, connect };
