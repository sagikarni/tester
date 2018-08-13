import * as Sequelize from 'sequelize';

export default (sequalize: Sequelize.Sequelize) => {
  let Products = sequalize.define('Products', {
    id: {
      type: Sequelize.STRING,
      autoIncrement: false,
      primaryKey: true
    },
    title: { type: Sequelize.STRING, allowNull: false },
    url: { type: Sequelize.STRING, allowNull: false },
    vendor: { type: Sequelize.STRING, allowNull: false },
    price: { type: Sequelize.STRING, allowNull: false },
    date: { type: Sequelize.STRING, allowNull: false }
  });

  Products.associate = function(models) {
    Products.belongsToMany(models.Lists, {
      through: models.ListsProducts,
      foreignKey: 'productId'
    });
    Products.belongsToMany(models.Keywords, {
      through: models.ProductsKeywords,
      foreignKey: 'productId'
    });
  };

  return Products;
};
