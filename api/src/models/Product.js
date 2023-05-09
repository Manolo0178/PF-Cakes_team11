const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('product', {
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
            type: DataTypes.DECIMAL(10, 2)
        },

        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        }
    },
        {
            timestamps: false,
            tableName: "Product"
        }
    )
}


