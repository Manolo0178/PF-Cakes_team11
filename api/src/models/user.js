const { DataTypes } = require('sequelize');
const bcrypt = require("bcrypt")
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image: {
      type: DataTypes.TEXT,
      defaultValue: "https://www.latercera.com/resizer/m0bOOb9drSJfRI-C8RtRL_B4EGE=/375x250/smart/arc-anglerfish-arc2-prod-copesa.s3.amazonaws.com/public/Z2NK6DYAPBHO3BVPUE25LQ22ZA.jpg",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: true
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },
    created: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
    
  }, {
    timestamps: true,
    freezeTableName: true,
    tableName: "user"
  });

  User.beforeCreate((user) => {
    user.password = user.password ? bcrypt.hashSync(user.password, 10) : null
  });

  return User

};
