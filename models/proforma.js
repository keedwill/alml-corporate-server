"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Proforma extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Proforma.belongsTo(models.User);
      Proforma.belongsToMany(models.Service, {
        through: "Proforma_Service",
      });
    }
  }
  Proforma.init(
    {
      id: {
      type: DataTypes.UUID,
      unique: true,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    
    bookingEmail:{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    }
    ,
      UserId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
      totalAmount: {
       type: DataTypes.INTEGER,
       allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "paid"),
        defaultValue: "pending",
      },
      
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      modelName: "Proforma",

      freezeTableName: true,
    }
  );
  return Proforma;
};
