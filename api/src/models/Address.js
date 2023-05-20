const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define("address", {
        
        shippingAddress: {
            type: DataTypes.TEXT,
            allowNull: false
          },
          postalCode: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          city: {
            type: DataTypes.STRING,
            allowNull:false
          },
          location: {
            type: DataTypes.STRING,
            allowNull: false
          }
    }, {
      timestamps: false,
        freezeTableName: true,
        tableNAme: "address"  
    })
}
