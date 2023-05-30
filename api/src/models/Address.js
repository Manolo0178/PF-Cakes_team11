const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define("address", {
        
        street: {
            type: DataTypes.TEXT,
            allowNull: false
          },
          postalCode: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          province: {
            type: DataTypes.STRING,
            allowNull:false
          },
          number: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          city: {
            type: DataTypes.STRING,
            allowNull:false
          },
          telephoneContact: {
            type: DataTypes.STRING,
            allowNull: false
          }
    }, {
      timestamps: true,
        freezeTableName: true,
        tableNAme: "address"  
    })
}
