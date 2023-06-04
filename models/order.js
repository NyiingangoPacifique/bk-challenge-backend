'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, { foreignKey: 'userId' });
      Order.belongsTo(models.SeedFertilizer, { foreignKey: 'seedFertilizerId' });
    }
  }
  Order.init({
    userId: DataTypes.INTEGER,
    seedFertilizerId:DataTypes.INTEGER,
    land: DataTypes.DECIMAL,
    quantity: DataTypes.DECIMAL,
    totalAmount: DataTypes.DECIMAL,
    orderAddress: DataTypes.STRING,
    status: DataTypes.ENUM('pending', 'approved', 'rejected'),
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};