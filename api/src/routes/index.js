const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
let productRouter = require("./productRouter.js")
let dessertRouter = require("./dessertRouter.js")
 
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/products", productRouter);
router.use("/desserts", dessertRouter);


module.exports = router;
