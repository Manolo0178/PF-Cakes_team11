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
    const { name, size = 0, page = 10, sort, sortBy } = req.query;

    let option = {
      limit: Number(size),
      offset: Number(page) * Number(size),
      include: Dessert,
      order: []
    };

    if (sortBy && sortBy === 'price') {
      option.order.push(['price', sort === 'desc' ? 'DESC' : 'ASC']);
    } else {
      option.order.push(['name', sort === 'desc' ? 'DESC' : 'ASC']);
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
        order: []
      };

      if (sortBy && sortBy === 'price') {
        optionName.order.push(['price', sort === 'desc' ? 'DESC' : 'ASC']);
      } else {
        optionName.order.push(['name', sort === 'desc' ? 'DESC' : 'ASC']);
      }

      const { count, rows } = await Product.findAndCountAll(optionName);
      const product = rows.length;

      product ? res.json({ status: "success", total: count, product: rows, length: rows.length }) : res.status(404).json({ message: `Product name not found ${name}` });
    } else {
      const { count, rows } = await Product.findAndCountAll(option);
      res.json({ status: "success", total: count, product: rows, length: rows.length });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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



productRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, description, summary, image } = req.body;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: `Product with id ${id} not found` });
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.summary = summary || product.summary
    product.image = image || product.image

    await product.save();

    res.json({ status: `the ${product.name} product was successfully modified`, product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Resto del código de la ruta GET paginada...


//delete the products
productRouter.delete("/:idProduct", (req, res) => {
  let {idProduct} = req.params;
  try {
    if(idProduct) {
    let deletedProduct = Product.destroy({
      where: {
        id: idProduct
      }
    })
    res.status(200).json(deletedProduct)
  } else {
    res.status(404).json({message: "Product not found by id"})
  }
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

      
 module.exports = productRouter       




