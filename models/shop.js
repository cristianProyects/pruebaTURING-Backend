"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class shop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  shop.init(
    {
      user_id: DataTypes.INTEGER,
      component_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "shop",
      timestamps: false,
      tableName: "shops",
    }
  );
  return shop;
};
