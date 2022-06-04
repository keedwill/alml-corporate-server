"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Proforma_Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Proforma_Service.init(
    {
      id: {
        type: DataTypes.UUID,
        unique: true,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      agreedFee:{
        type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      },
      ProformaId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Proforma",
          key: "id",
        },
      },
      ServiceId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Service",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Proforma_Service",

      freezeTableName: true,
    }
  );
  return Proforma_Service;
};
