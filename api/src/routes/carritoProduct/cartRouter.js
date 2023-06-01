const express = require("express");
const cartRouter = express.Router();

const { User, Address, Product, Cart, OrderItem } = require("../../db.js");


cartRouter.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({
      where: { userId },
      include: [
        {
          model: Product,
          where: {
            deleted: false,
          },
          through: {
            attributes: ["quantity"],
          },
          attributes: { exclude: ["summary", "description"] },
        },
        {
          model: User,
          include: [Address],
          attributes: { exclude: ["password", "image", "googleId"] },
        },
      ],
    });
    res.json(cart);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

cartRouter.get("/", async(req, res) => {
  try {
    let cartItem = await Cart.findAll({
      
      include: [
        {
          model: User,
          include: [Address],
          attributes: { exclude: ["password", "image", "googleId"] }
        },
        {
          model: Product,
          through: {
            attributes: ['quantity'],
          },
          attributes: { exclude: ['summary', "description"] }
        },
      ],
      })
      if(cartItem) {
        res.status(200).json(cartItem)
      } else {
        res.status(404).json({message: "Aun no hay producto en el carrito"})
      }
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  })

cartRouter.post("/:userId/:productId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId } = req.params;

    const { quantity } = req.body || 1;

    let cart = await Cart.findOne({ where: { userId } });

    if (!cart) {
      cart = await Cart.create({ userId });
    }

    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.deleted === true) {
      product.deleted = false;
      await product.save();
    }
    await cart.addProduct(product, { through: { quantity } });

    res.json({ message: "Product added to cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

cartRouter.delete("/:userId/:productId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;

    const cart = await Cart.findOne({ where: { userId } });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.deleted = true;
    await product.save();

    res.json({ message: "Product removed from cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

cartRouter.delete("/reset/:idUser/user", async (req, res) => {
  try {
    const { idUser } = req.params;
    const cart = await Cart.findByPk(idUser);
    if (!cart) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const result = await cart.setProducts([]);
    res.status(200).json(result)
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = cartRouter;
