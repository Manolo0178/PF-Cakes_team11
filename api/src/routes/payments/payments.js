const express = require ("express");
const Stripe = require("stripe");
const cors = require("cors");

const app = express()

const stripe = new Stripe("sk_test_51N9XymIq7GOKCNm5vx0tCJemZcitthUTb22WD4gvJo6apMvU6Q30moeVbBcKpiBUKonYRpsNOnmSDiFsOZIlT6fK00tNznIDka")

app.use(cors({origin: 'http://localhost:3000'}))
app.use(express.json())

app.post('/api/checkout', async(req, res) => { 
    try {
        const {id, amount} = req.body

        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "cake",
            payment_method: id,
            confirm: true
        });

        console.log(payment)

        res.send({message: 'Pago realizado'})
    } catch (error) {
        console.log(error)
        res.json({message: error.raw.message})
    }
    
})

app.listen(3002, ()=>{
    console.log('server on port', 3002)
})