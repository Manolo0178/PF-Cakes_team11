const {DataTypes} = require("sequelize")

module.exports = (sequelize) => {
sequelize.define("dessert", {
  name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // deleted: {
    //   type: DataTypes.BOOLEAN,
    //   allowNull: false,
    //   defaultValue: true
    // }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: "dessert" 
  })
}
      