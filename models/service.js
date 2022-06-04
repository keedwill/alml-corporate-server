"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Service.belongsTo(models.Category);
      Service.belongsToMany(models.Contract, {
        through: "Contract_Service",
      });
      Service.belongsToMany(models.Proforma, {
        through: "Proforma_Service",
      });
    }
  }
  Service.init(
    {
      id: {
        type: DataTypes.UUID,
        unique: true,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      CategoryId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Category",
          key: "id",
        },
      },
      status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "active",
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fee: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "Service",
    }
  );
  return Service;
};
