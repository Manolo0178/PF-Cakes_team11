const express = require("express");
const shopsRouter = express.Router();
const {User, Product, Shoping} = require("../../db");

//********** Post *************/
shopsRouter.post("/:idUser/:product/:cantidad/:price", async (req, res) => {
    try {
        const { idUser, product, cantidad, price } = req.params
        
        const user = await User.findByPk(idUser)
        const userProduct = await Product.findByPk(product)

        if (!user) {
            res.status(404).json({message: "usuario no encontrado"})
        }
        if(!userProduct){
            res.status(404).json({message: "producto no encontrado"})
            
        }

         await user.addShopProduct(userProduct);

        const shopi = {
            cantidad: cantidad,
            price: price,
            productId: product,
            userId: idUser
        }

           await Shoping.create(shopi)
        res.status(200).json({message: 'Todo salio bien'})

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
    

})

shopsRouter.get('/', async (req, res) => {
    try {
        const shop = await Shoping.findAll();
        if(!shop){
            res.status(404).json({message: 'no se encontraron ventas'})
        }
        res.status(200).json(shop)
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})



shopsRouter.get("/:idUser", async(req, res) => {
    try {
        const { idUser } = req.params
        const prop = await Shoping.findAll()
        const product = [];
        const user = await User.findByPk(idUser)

        for(const shop of prop){
           const userProduct = await user.getShopProducts({where: { id: shop.productId }});
           product.push({userProduct: userProduct[0], shop})
        }
        

        if (!prop) {
            res.status(404).json({ message: "usuario no tiene compras" });
        }
        res.status(200).json(product)

    } catch (error) {
        console.log(error.message);
    }
})


module.exports = shopsRouter;