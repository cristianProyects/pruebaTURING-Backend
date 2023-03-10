"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      category.hasMany(models.component, {
        foreignKey: "category_id",
      });
      // define association here
    }
  }
  category.init(
    {
      category: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "category",
      timestamps: false,
      tableName: "category",
    }
  );
  return category;
};
