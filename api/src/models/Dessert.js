const {DataTypes} = require("sequelize")

module.exports = (sequelize) => {
sequelize.define("dessert", {
  name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: "dessert" 
  })
}
      