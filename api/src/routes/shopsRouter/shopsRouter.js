const express = require("express");
const shopsRouter = express.Router();
const {User, Product} = require("../../db")

//********** Post *************/
shopsRouter.post("/:idUser/:product", async (req, res) => {
    try {
        const { idUser, product } = req.params
        
        const user = await User.findByPk(idUser)
        const userProduct = await Product.findByPk(product)
        if (!user) {
            res.status(404).json({message: "usuario no encontrado"})
        }
        const prod = await user.addShopProduct(userProduct);
        
        res.status(200).json(prod)
    } catch (error) {
        console.log(error.message);
    }
    

})



shopsRouter.get("/:idUser", async(req, res) => {
    try {
        const { idUser } = req.params
        const user = await User.findByPk(idUser)
        if (!user) {
        res.status(404).json({ message: "usuario no encontrado" });
        }
        const prop = await user.getShopProducts();
        if (!prop) {
            res.status(404).json({ message: "usuario no tiene compras" });
        }
        res.status(200).json(prop)

    } catch (error) {
        console.log(error.message);
    }
})


module.exports = shopsRouter;