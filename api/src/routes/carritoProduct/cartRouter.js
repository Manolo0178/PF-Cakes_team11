const express = require("express");
const cartRouter = express.Router();

<<<<<<< HEAD
<<<<<<< HEAD
const { Product, Cart } = require("../../db.js");


cartRouter.get('/:userId', async (req, res) => {
    try {

        const { userId } = req.params;

        const cart = await Cart.findOne({
            where: { userId },
            include: [
                {
                    model: Product,
                    through: {
                        attributes: ['quantity'],
                    },
                },
            ],
        });

        res.json(cart);
    } catch (error) {

        res.status(500).json({ message: error.message });
    }
=======
const { User, Address, Product, Cart } = require("../../db.js");
=======

const { User, Address, Product, Cart, OrderItem } = require("../../db.js");
>>>>>>> beadd4c922e10244cca3f2b3fd6adf89abe14026

cartRouter.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const cart = await Cart.findOne({
      where: { userId },
      include: [
        {
          model: Product,
          through: {
            attributes: ['quantity'],
          },
        },
        {
          model: User,
          include: [Address],
          
        },
      ],
    });
   
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
>>>>>>> ebab74f34d182125449ffe6cec53a886a24ca03c
});


cartRouter.post('/:userId/:productId', async (req, res) => {
<<<<<<< HEAD
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
            return res.status(404).json({ message: 'Product not found' });
        }

        await cart.addProduct(product, { through: { quantity } });

        res.json({ message: 'Product added to cart' });
    } catch (error) {

        res.status(500).json({ message: error.message });
=======
  try {
    
    const {userId}= req.params;
    const {productId} = req.params;
   
    const {quantity} = req.body || 1;
    
    let cart = await Cart.findOne({ where: { userId } });
    
    if (!cart) {
      cart = await Cart.create({ userId });
>>>>>>> ebab74f34d182125449ffe6cec53a886a24ca03c
    }
<<<<<<< HEAD
=======
    
    const product = await Product.findByPk(productId);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    await cart.addProduct(product, { through: { quantity } });
    
    res.json({ message: 'Product added to cart' });
  } catch (error) {
    
    res.status(500).json({ message: error.message });
  }

>>>>>>> beadd4c922e10244cca3f2b3fd6adf89abe14026
});
cartRouter.delete('/:userId/:productId', async (req, res) => {
<<<<<<< HEAD
    try {
        //se comento
        const userId = req.params.userId;
        const productId = req.params.productId;
        //omenr
        const cart = await Cart.findOne({ where: { userId } });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await cart.removeProduct(product);
        res.json({ message: 'Product removed from cart' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

=======
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;

    const cart = await Cart.findOne({ where: { userId } });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const orderItem = await OrderItem.findOne({
      where: { cartId: cart.id, productId },
    });

    if (!orderItem) {
      return res.status(404).json({ message: 'Product not found in the cart' });
    }

    // Actualizar el campo 'deleted' del OrderItem a true en lugar de eliminarlo físicamente
    await orderItem.update({ deleted: true });

    res.json({ message: 'Product removed from cart' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

    
>>>>>>> beadd4c922e10244cca3f2b3fd6adf89abe14026

module.exports = cartRouter;

