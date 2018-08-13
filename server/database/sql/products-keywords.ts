import * as Sequelize from 'sequelize';

export default (sequalize: Sequelize.Sequelize) => {
  let ProductsKeywords = sequalize.define('ProductsKeywords', {
    productId: {
      type: Sequelize.STRING,
      autoIncrement: false,
      primaryKey: true
    },
    keywordId: {
      type: Sequelize.STRING,
      autoIncrement: false,
      primaryKey: true
    }
  });

  return ProductsKeywords;
};
