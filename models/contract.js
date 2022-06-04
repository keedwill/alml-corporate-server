"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Contract extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Contract.belongsTo(models.User);
      Contract.belongsToMany(models.Service, {
        through: "Contract_Service",
      });
    }
  }
  Contract.init(
    {
      id: {
        type: DataTypes.UUID,
        unique: true,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },

      status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "active",
      },
      UserId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
      duration:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0,
      }
    },
    {
      sequelize,
      modelName: "Contract",
      freezeTableName: true,
    }
  );
  return Contract;
};
