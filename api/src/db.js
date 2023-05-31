require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Product, Dessert, Cart, OrderItem, Review, User, Address } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Product.belongsToMany(Dessert, { through: 'productAll' });//************ */
Dessert.belongsToMany(Product, { through: 'productAll' });//************ */

///*****realcion de muchos a muchos y uno a uno */
Product.belongsToMany(Cart, { through: OrderItem });
Cart.belongsToMany(Product, { through: OrderItem });

OrderItem.belongsTo(Product);
OrderItem.belongsTo(Cart)

Cart.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(Cart, { foreignKey: 'userId' });

Product.hasMany(Review) // Aquí se establece una relación de "uno a muchos" entre los modelos Product y Reviews. Esto significa que un producto puede tener varios comentarios.
User.hasMany(Review) // Esta línea establece una relación de "uno a muchos" entre los modelos Users y Reviews. Esto significa que un usuario puede tener varios comentarios.

Review.belongsTo(Product) // Aquí se establece que una reseña pertenece a un solo producto.
Review.belongsTo(User) // Aquí se establece que una reseña pertenece a un solo usuario.


User.belongsToMany(Address, { through: 'UserAddress' }); 
Address.belongsToMany(User, { through: 'UserAddress' });

Product.belongsToMany(User, { through: 'Favoritos' }); 
User.belongsToMany(Product, { through: 'Favoritos' });

Product.belongsToMany(User, { through: "Shop", as: "shopProducts", timestamps: false });
User.belongsToMany(Product, { through: "Shop", as: "shopProducts", timestamps: false });
// comentario de prueba


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
