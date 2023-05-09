const { DataTypes } = require('sequelize');



module.exports = (sequelize) => {
    sequelize.define("order"), {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        status: {
            type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
            allowNull: false,
            defaultValue: 'pending'
        },


    };
};