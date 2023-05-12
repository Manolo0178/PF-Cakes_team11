const { Op } = require('sequelize')
const express = require("express");
const productRouter = express.Router();
const { Product, Dessert } = require("../../db.js")
const {dataBs} = require("../../controler/index.js")
dataBs()


productRouter.get("/:idProduct", async (req, res) => {
  const { idProduct } = req.params

  try {
    const getProductById = await Product.findOne({
      where: {
        id: idProduct
      },
      include: [
        {
          model: Dessert,
          attributes: ["name"],
          through: { attributes: [] },
        }
      ]
    });

    if (getProductById) {

      return res.status(200).json(getProductById)

    } else {
      return res.status(404).json({ error: { message: "Product doesn't exist", value: { ...req.params } } });
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})



productRouter.get("/", async (req, res) => {
  try {
    const { name, size = 0, page = 10 } = req.query;

    let option = {
      limit: Number(size),
      offset: Number(page) * Number(size),
      include: Dessert
    }

    if (name) {
      let optionName = {
        limit: Number(size),
        offset: Number(page) * Number(size),
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          }
        },
        include: Dessert,
      }
      const {count, rows} = await Product.findAndCountAll(optionName)
      const product = rows.length
      product ? 
      res.json({
        status: "succes",
        total: count,
        product: rows,
        length: rows.length // esta linea sirve para ver cuantos productos traen por paginado
      })
      : res.status(404).json({ message: `Product name not found ${name}` })
      // const productBDd = await Product.findAll({
      //   where: {
      //     name: {
      //       [Op.iLike]: `%${name}%`,
      //     }
      //   },
      //   include: Dessert,
      // })
      // if (!productBDd.length > 0) {
      //   res.status(404).json({ message: `Product name not found ${name}` })
      // } else {
      //   res.status(200).json(productBDd)
      // }
    } else {
      // const productBdd = await Product.findAll({ include: Dessert }) // Esta linea trae todos los productos sin paginar.
      //   res.status(200).json(productBdd);
      const {count, rows} = await Product.findAndCountAll(option)
      res.json({
        status: "succes",
        total: count,
        product: rows,
        // length: rows.length // esta linea sirve para ver cuantos productos traen por paginado
      })
      }
    } catch (error) {
      res.status(500).json({ message: error.message })
  }
})
//se agrego un controlador que hace un pedido a una api creada por url
        
productRouter.post("/", async (req, res) => {
  try {
    let { name, summary, description, image, price, desserts } = req.body;
    const existingProduct = await Product.findOne({ where: { name } });
    // verifica si existe un producto con el mismo  nombre en la db salta a la sgte iteracion
    // evitando la creacion con el mismo nombre
    if (existingProduct) {
      return res.status(400).json({ message: "Product name already exists" });
    }
    const newProduct = await Product.create({
      name,
      description,
      summary,
      image,
      price
    })
    if (Array.isArray(desserts)) {
      const dessertInstances = await Promise.all(desserts.map(async dessert => {
        const [dessertInstances] = await Dessert.findOrCreate({ where: { name: dessert } })
        return dessertInstances

      }))
      await newProduct.addDesserts(dessertInstances)
      res.status(200).json(newProduct)
    } else {

      res.status(404).json({ message: "product not Created" })
    }


  } catch (error) {
    res.status(500).json({ message: error.message })
  }

})
module.exports = productRouter;
      
        




