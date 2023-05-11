const { express } = require("express");
const productRouter = express.Router()
const {Product, Dessert} = require("../db.js")
// productRouter.get()

module.exports = productRouter