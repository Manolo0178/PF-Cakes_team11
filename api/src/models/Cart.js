const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("cart", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    order: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: "cart"
  })
}

