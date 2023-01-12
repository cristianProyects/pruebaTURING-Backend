"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class component extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      component.hasMany(models.shop, {
        foreignKey: "component_id",
      });
    }
  }
  component.init(
    {
      title: DataTypes.STRING,
      specifications: DataTypes.STRING,
      price: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "component",
      timestamps: false,
      tableName: "components",
    }
  );
  return component;
};
