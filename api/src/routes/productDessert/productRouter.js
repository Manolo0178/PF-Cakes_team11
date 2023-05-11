const { Op } = require('sequelize')
const express = require("express");
const productRouter = express.Router()
const { Product, Dessert } = require("../../db.js")


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

      return res.status(200).send(getProductById)

    } else {
      return res.status(404).json({ error: { message: "Product doesn't exist", value: { ...req.params } } });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });



  }
})


productRouter.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const productBDd = await Product.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          }
        },
        include: Dessert,
      })
      if (!productBDd) {
        res.status(404).json({ message: `Product name not found ${name}` })
      } else {
        res.status(200).json(productBDd)
      }
    } else {
      const productBdd = await Product.findAll()
      res.status(200).json(productBdd);
    }

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})



productRouter.post("/", async (req, res) => {
  try {
    let { name, summary, description, image, price, desserts } = req.body;

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
