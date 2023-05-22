const express = require ("express");
const Stripe = require("stripe");
const paymentRouter = express.Router()



const stripe = new Stripe("sk_test_51NAMXNJW5R242vXYcSfN6ngPmcNbRmFN1gsyfDlansI8PUk6mtaIjzBMIfdk8xaEyTQDhNyQCAz45QvyxaIrXet600bNNIjWv9")

// paymentRouter.use(cors({origin: 'http://localhost:3000'}))
// app.use(express.json())

paymentRouter.post('/checkout', async(req, res) => { 
    const {id, amount} = req.body
    
    try {

        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "cake",
            payment_method: id,
            confirm: true
        });

        console.log(payment)

        return res.status(200).json({ message: "Successful Payment" });
    } catch (error) {
        console.log(error)
        return res.json({message: error.raw.message})
    }
    
})

module.exports = paymentRouter;