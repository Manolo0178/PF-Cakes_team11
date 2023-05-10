const express  = require("express");
const productRouter = express.Router()
const {Product, Dessert} = require("../../db.js")
// productRouter.get()

productRouter.get("/:idProduct", async (req, res) => {

})


productRouter.get("/", async (req, res) => {
  

})



productRouter.post("/", async(req, res) => {
  try {
    let {name, summary, description, image, price, desserts} = req.body;
    
      const newProduct = await Product.create({
        name,
        description,
        summary,
        image,
        price
      })
      if(Array.isArray(desserts)) {
        const dessertInstances = await Promise.all(desserts.map( async dessert => {
          const [dessertInstances] = await Dessert.findOrCreate({where: {name: dessert}})
          return dessertInstances
          
        }))
        await newProduct.addDesserts(dessertInstances)
        res.status(200).json(newProduct)
      } else {

        res.status(404).json({message: "product not Created"})
      }

      
  } catch (error) {
    res.status(500).json({message: error.message})
  }

})
module.exports = productRouter;