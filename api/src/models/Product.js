const { DataTypes } = require("sequelize");

const Product = (sequelize) => {
    sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER, // hasta un maximo de 9999.99
            //allowNull: false
        },
        deleted: { // Borrado logico
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: "Product"
        }
    )
}

module.exports = Product;
