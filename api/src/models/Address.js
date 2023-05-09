const {DataTypes} = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define("address", {
        
        shippingAddress: {
            type: DataTypes.TEXT,
            allowNull: false
          },
    }, {
        timesStamps: false,
        freezeTableName: true,
        tableNAme: "address"  
    })
}
