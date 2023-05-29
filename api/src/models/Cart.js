const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("cart", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    timestamps: true,
    freezeTableName: true,
    tableName: "cart"
  })
}

