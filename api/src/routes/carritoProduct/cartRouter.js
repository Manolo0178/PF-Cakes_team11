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
          attributes: { exclude: ['summary', "image", "description"] }
        },
        {
          model: User,
          include: [Address],
          attributes: { exclude: ["password", "image", "googleId"] }
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
          attributes: { exclude: ['summary', "image", "description"] }
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
// cartRouter.delete('/:userId/:productId', async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const productId = req.params.productId;

//     const cart = await Cart.findOne({ where: { userId } });

//     if (!cart) {
//       return res.status(404).json({ message: 'Cart not found' });
//     }

//     const orderItem = await OrderItem.findOne({
//       where: { cartId: cart.id, productId },
//     });

//     if (!orderItem) {
//       return res.status(404).json({ message: 'Product not found in the cart' });
//     }

//     // Actualizar el campo 'deleted' del OrderItem a true en lugar de eliminarlo físicamente
//     await orderItem.remove({ deleted: true });

//     res.json({ message: 'Product removed from cart' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
cartRouter.delete('/:userId/:productId', async (req, res) => {
  try {
    // Obtener el id del usuario y el id del producto de los parÃ¡metros de la ruta
    const userId = req.params.userId;
    const productId = req.params.productId;
    // Buscar el carrito del usuario en la base de datos
    const cart = await Cart.findOne({ where: { userId } });
    // Si no existe el carrito, enviar un mensaje de error
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    // Buscar el producto en la base de datos
    const product = await Product.findByPk(productId);
    // Si no existe el producto, enviar un mensaje de error
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
}
    // Eliminar el producto del carrito
    product.deleted = true;
    await product.save();
    // Enviar un mensaje de Ã©xito como respuesta
    res.json({ message: 'Product removed from cart' });
  } catch (error) {
     // Enviar un mensaje de error si ocurre algÃºn problema
     res.status(500).json({ message: error.message });
  }
});
    

module.exports = cartRouter;

