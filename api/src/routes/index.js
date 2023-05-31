const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
let productRouter = require("./productDessert/productRouter.js")
let dessertRouter = require("./productDessert/dessertRouter.js")
let reviewRouter = require('./reviewRouter/reviewRouter.js')
let cartRouter = require("./carritoProduct/cartRouter.js")
let userRouter = require("./userRouter/userRouter.js")
let addressRouter = require("./addressesRouter/addressRouter.js")
let paymentRouter = require("./payments/paymentRouter.js")
let favoritosRouter = require('./productDessert/favoritos.js')
let shopsRouter = require("./shopsRouter/shopsRouter.js")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/products", productRouter); // comentario ejemplo
router.use("/desserts", dessertRouter);
router.use('/review', reviewRouter);
router.use("/carts", cartRouter);
router.use("/user", userRouter);
router.use("/Address",addressRouter);
router.use("/api", paymentRouter);
router.use('/favoritos', favoritosRouter);
router.use('/shops', shopsRouter);

module.exports = router;
