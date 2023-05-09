const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        username: {
            // nombre del usuario
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please provide username'
                },
                notEmpty: {
                    msg: 'Username cannot be empty'
                }
            }
        },
        email: {
            type: DataTypes.STRING, //  contacto del usuario
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please provide an email address'
                },
                isEmail: {
                    msg: 'Please provide a valid email address'
                }
            }
        },
        role: {
            // user - admin
            type: DataTypes.ENUM('admin', 'user', 'guest'),
            allowNull: false
        },

        password: {
            type: DataTypes.STRING,
            allowNull: true
        },

    },
        {
            timestamps: false,
            tableName: "User"
        }
    )
};

