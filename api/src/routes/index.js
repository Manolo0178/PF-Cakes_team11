const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
let productRouter = require("./productDessert/productRouter.js")
let dessertRouter = require("./productDessert/dessertRouter.js")
let reviewRouter = require('./reviewRouter/reviewRouter.js')
let cartRouter = require("./carritoProduct/cartRouter.js")
let routerPago = require('./routerPagos/routerPago.js')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/products", productRouter); // comentario ejemplo
router.use("/desserts", dessertRouter);
router.use('/review', reviewRouter)
router.use("/carts", cartRouter)
// router.use('/checkout', routerPago)


module.exports = router;
