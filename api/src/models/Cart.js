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
      defaultValue: true
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: "cart"
  })
}

