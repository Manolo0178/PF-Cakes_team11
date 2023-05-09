const {DataTypes} = require("sequelize")

module.exports = (sequelize) => {
  sequelize.define('orderItem', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    timestamps: true,
    freezeTableName: true,
    tableName: 'orderItem'
  })
}
