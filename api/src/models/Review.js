const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // Definir el modelo
  sequelize.define("Review", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    qualification: {
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
    tableName: "review",
  });
};
