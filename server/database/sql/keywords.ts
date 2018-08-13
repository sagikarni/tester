import * as Sequelize from 'sequelize';

export default (sequalize: Sequelize.Sequelize) => {
  let Keywords = sequalize.define('Keywords', {
    id: {
      type: Sequelize.STRING,
      autoIncrement: false,
      primaryKey: true
    },
    text: { type: Sequelize.STRING, allowNull: false },
    score: { type: Sequelize.STRING, allowNull: false },
    volume: { type: Sequelize.STRING, allowNull: false },
    cpc: { type: Sequelize.STRING, allowNull: false },
    value: { type: Sequelize.STRING, allowNull: false }
  });

  Keywords.associate = function(models) {
    Keywords.hasOne(models.Products);

    Keywords.belongsToMany(models.Products, {
      through: models.ProductsKeywords,
      foreignKey: 'keywordId'
    });
  };

  return Keywords;
};
