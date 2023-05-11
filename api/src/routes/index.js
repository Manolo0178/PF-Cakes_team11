const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
let productRouter = require("./productDessert/productRouter.js")
let dessertRouter = require("./productDessert/dessertRouter.js")
/*********/
let cartRouter = require("./carritoProduct/cartRouter.js")
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/products", productRouter); // comentario ejemplo
router.use("/desserts", dessertRouter);

router.use("/carts", cartRouter)


module.exports = router;
