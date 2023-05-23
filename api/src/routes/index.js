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
let paymentRouter = require("./payments/paymentRouter.js")

>>>>>>> beadd4c922e10244cca3f2b3fd6adf89abe14026
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
router.use("/api", paymentRouter);

module.exports = router;
