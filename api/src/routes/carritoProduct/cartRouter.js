const express = require("express");
const cartRouter = express.Router();


const { User, Address, Product, Cart, OrderItem } = require("../../db.js");

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
});


cartRouter.post('/:userId/:productId', async (req, res) => {
  try {
    
    const {userId}= req.params;
    const {productId} = req.params;
   
    const {quantity} = req.body || 1;
    
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
  }

});
cartRouter.delete('/:userId/:productId', async (req, res) => {
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

    

module.exports = cartRouter;

