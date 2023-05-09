const { DataTypes } = require("sequelize");

const Users = (sequelize) => {
    sequelize.define("Users", {
        id: {
            type: DataTypes.UUID, // este tipo de dato es para que no se repita con el de la API (234T324R23T)
            defaultValue: DataTypes.UUIDV4, // y se genera de independencia
            allowNull: false,
            primaryKey: true
        },
        name: {
            // nombre del usuario
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING, //  contacto del usuario
            allowNull: false
        },
        contact: {
            // numero del profesional
            type: DataTypes.STRING,
            allowNull: true
        },
        deleted: {
            //borrado logico
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        token: {
            type: DataTypes.STRING,
            allowNull: true
        },
        trolley: { //(Este es el carrito)
            type: DataTypes.BOOLEAN, 
            defaultValue: false
          },
    },
        {
            timestamps: false
        }
    )
};


module.exports = Users;