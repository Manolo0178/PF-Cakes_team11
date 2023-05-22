const express = require ("express");
const Stripe = require("stripe");
const paymentRouter = express.Router()



const stripe = new Stripe("sk_test_51N9Yt8Kl97uryD4r17QcmYWGPjXz9GtkZ2M5Uuf5672XsWkoEh28j12wABcdRIxqW4TQUhDBCSpn46T8u5Apoq8G00d1Pp3ko4")

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
        res.json({message: error.raw.message})
    }
    
})

module.exports = paymentRouter;