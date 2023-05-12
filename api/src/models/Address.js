const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define("address", {
        
        shippingAddress: {
            type: DataTypes.TEXT,
            allowNull: false
          }, // horacio 
    }, {
        timesStamps: false,
        freezeTableName: true,
        tableNAme: "address"  
    })
}
