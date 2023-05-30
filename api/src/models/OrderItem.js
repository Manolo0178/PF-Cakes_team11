const {DataTypes} = require("sequelize")

module.exports = (sequelize) => {
  sequelize.define('orderItem', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
   
  }, {
    timestamps: true,
    freezeTableName: true,
    tableName: 'orderItem'
  });
}
