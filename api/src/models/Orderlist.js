const { DataTypes } = require('sequelize');



module.exports = (sequelize) => {
    sequelize.define("orderlist"), {

        price: {
            type: DataTypes.INTEGER,
        },
        quantity: {
            type: DataTypes.INTEGER
        }


    };
};