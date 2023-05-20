const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
let productRouter = require("./productDessert/productRouter.js")
let dessertRouter = require("./productDessert/dessertRouter.js")
let reviewRouter = require('./reviewRouter/reviewRouter.js')
let cartRouter = require("./carritoProduct/cartRouter.js")
<<<<<<< HEAD
let routerPago = require('./routerPagos/routerPago.js')
=======
let userRouter = require("./userRouter/userRouter.js")
let addressRouter = require("./addressesRouter/addressRouter.js")
>>>>>>> ebab74f34d182125449ffe6cec53a886a24ca03c
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/products", productRouter); // comentario ejemplo
router.use("/desserts", dessertRouter);
<<<<<<< HEAD
router.use('/review', reviewRouter)
router.use("/carts", cartRouter)
// router.use('/checkout', routerPago)
=======
router.use('/review', reviewRouter);
router.use("/carts", cartRouter);
router.use("/user", userRouter);
router.use("/Address",addressRouter);
>>>>>>> ebab74f34d182125449ffe6cec53a886a24ca03c


module.exports = router;
