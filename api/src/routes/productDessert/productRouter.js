const { Op } = require('sequelize')
const express = require("express");
const productRouter = express.Router();
const { Product, Dessert } = require("../../db.js")
const {dataBs} = require("../../controler/index.js")
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
dataBs()

const cloudinary = require("cloudinary").v2;
require("dotenv").config()
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
}) 

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
      if (!productBDd.length > 0) {
        res.status(404).json({ message: Product `name not found ${name}` })
      } else {
        res.status(200).json(productBDd)
      }
    } else {
      const productBdd = await Product.findAll({ include: Dessert })
        res.status(200).json(productBdd);
      }
    } catch (error) {
      res.status(500).json({ message: error.message })
  }
})
productRouter.get('/imagen/todas', async (req, res) => {
  try {
    const productImages = await Product.findAll({
      attributes: [ 'id','name' ,'image'],
      limit: 4
    });
    res.json(productImages)
  } catch (error) {
    console.log(error.message);
  }
})
// productRouter.get("/", async (req, res) => {
//   try {
//     const { name, size = 5, page = 0, sort, sortBy } = req.query;

//     // Restar 1 al valor de la página
//     const adjustedPage = Math.max(Number(page) - 1, 0);

//     let option = {
//       limit: Number(size),
//       offset: adjustedPage * Number(size),
//       include: Dessert,
//       order: []
//     };

//     if (sortBy && sortBy === 'price') {
//       option.order.push(['price', sort === 'desc' ? 'DESC' : 'ASC']);
//     } else {
//       option.order.push(['name', sort === 'desc' ? 'DESC' : 'ASC']);
//     }

//     if (name) {
//       let optionName = {
//         limit: Number(size),
//         offset: adjustedPage * Number(size),
//         where: {
//           name: {
//             [Op.iLike]: `%${name}%`,
//           }
//         },
//         include: Dessert,
//         order: []
//       };

//       if (sortBy && sortBy === 'price') {
//         optionName.order.push(['price', sort === 'desc' ? 'DESC' : 'ASC']);
//       } else {
//         optionName.order.push(['name', sort === 'desc' ? 'DESC' : 'ASC']);
//       }

//       const { count, rows } = await Product.findAndCountAll(optionName);
//       const product = rows.length;

//       product ? res.json({ status: "success", total: count, product: rows, length: rows.length }) : res.status(404).json({ message: `Product name not found ${name}` });
//     } else {
//       const { count, rows } = await Product.findAndCountAll(option);
//       res.json({ status: "success", total: count, product: rows, length: rows.length });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


//se agrego un controlador que hace un pedido a una api creada por url
productRouter.post("/", async (req, res) => {
  try {
    let { name, summary, description, price, desserts, image } = req.body;
    //
    // Aquí se carga la imagen en Cloudinary
    
    const result = await cloudinary.uploader.upload(image, {
      folder: "img",
    });

    
    const existingProduct = await Product.findOne({ where: { name } });
        if (existingProduct) {
          return res.status(400).json({ message: "Product name already exists" });
        }
    const newProduct = await Product.create({
      name,
      description,
      summary,
      image: result.secure_url, // Guardamos la URL de la imagen en Cloudinary
      price,
    });

    if (Array.isArray(desserts)) {
      const dessertInstances = await Promise.all(
        desserts.map(async (dessert) => {
          const [dessertInstances] = await Dessert.findOrCreate({
            where: { name: dessert },
          });
          return dessertInstances;
        })
      );
      await newProduct.addDesserts(dessertInstances);
      res.status(200).json(newProduct);
    } else {
      res.status(404).json({ message: "Product not created" });
    }
  } catch (error) {
    console.log(error.body);
    res.status(500).json({ message: error.message });
  }
});             


productRouter.put("/:id",async (req, res) => {
  const { id } = req.params;
  const { name, price, description, summary, image } = req.body;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: `Product with id ${id} not found` });
    } 
      if (image) {

        const result = await cloudinary.uploader.upload(image, {
          folder: "img",
        });
        product.image = result.secure_url || product.image
        await product.save()
        
      }
    

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.summary = summary || product.summary
    product.image = product.image
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




