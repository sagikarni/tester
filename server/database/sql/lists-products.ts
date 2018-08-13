import * as Sequelize from 'sequelize';

export default (sequalize: Sequelize.Sequelize) => {
  let ListsProducts = sequalize.define('ListsProducts', {
    listId: {
      type: Sequelize.STRING,
      autoIncrement: false,
      primaryKey: true
    },
    productId: {
      type: Sequelize.STRING,
      autoIncrement: false,
      primaryKey: true
    },
    favorite: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    youtubes: { type: Sequelize.STRING, allowNull: true, defaultValue: '' }
  });

  return ListsProducts;
};
