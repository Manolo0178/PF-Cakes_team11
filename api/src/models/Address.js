const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define("address", {
        
        shippingAddress: {
            type: DataTypes.TEXT,
            allowNull: false
          }, // horacio
          deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
          }
    }, {
        timesStamps: false,
        freezeTableName: true,
        tableNAme: "address"  
    })
}
