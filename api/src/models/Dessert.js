const {DataTypes} = require("sequelize")

module.exports = (sequelize) => {
sequelize.define("dessert", {
  name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // deleted: {                    Comentado => Borrado logico
    //   type: DataTypes.BOOLEAN,
    //   allowNull: false,
    //   defaultValue: true
    // }
  }, {
    timestamps: true,
    freezeTableName: true,
    tableName: "dessert" 
  })
}
      