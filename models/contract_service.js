'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contract_Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Contract_Service.init({
    id: {
      type: DataTypes.UUID,
      unique: true,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
   
    agreedFee: DataTypes.STRING,
    ContractId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Contract', 
        key: 'id', 
      }
    },
    ServiceId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Service', 
        key: 'id', 
      }
    }
  }, {
    sequelize,
    modelName: 'Contract_Service',
    freezeTableName:true
  });
  return Contract_Service;
};