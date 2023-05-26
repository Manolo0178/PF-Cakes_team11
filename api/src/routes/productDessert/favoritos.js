const express = require('express');
const favoritosRouter = express.Router()
const { User, Product } = require('../../db')


favoritosRouter.get('/user/:idUser/products', async (req, res) => {
    try {
        const { idUser } = req.params;
        
        const user = await User.findByPk(idUser);
        if(!user){
            res.status(404).json({message: 'Usuario no encontrado'})
        }

        const productsFavoritos = await user.getProducts()

        res.status(200).json(productsFavoritos)

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

favoritosRouter.post('/user/:idUser/product/:idProduct', async (req, res) => {
    try {
        const { idUser, idProduct } = req.params;
        const user = await User.findByPk(idUser);
        const product = await Product.findByPk(idProduct);

        if(!user){
            res.status(404).json({message: 'Usuario no encontrado'})
        }
        await user.addProduct(product);

        res.status(200).json({message: 'Agregado correctamente'})

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

favoritosRouter.delete('/user/:idUser/product/:idProduct', async (req, res) => {
    try {
      const { idUser, idProduct } = req.params;
      const user = await User.findByPk(idUser);
      const product = await Product.findByPk(idProduct);

      if(!user){
        res.status(404).json({message: 'Usuario no encontrado'})
      }
        await user.removeProduct(product)

        res.status(200).json({message: 'eliminado correctamente'})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({me})
    }
})

module.exports = favoritosRouter