import * as Sequelize from 'sequelize';

export default (sequalize: Sequelize.Sequelize) => {
  let Lists = sequalize.define('Lists', {
    title: { type: Sequelize.STRING, allowNull: false },
    userId: { type: Sequelize.INTEGER, allowNull: false }
  });

  Lists.associate = function(models) {
    Lists.belongsToMany(models.Products, {
      through: models.ListsProducts,
      foreignKey: 'listId'
    });
  };

  return Lists;
};
