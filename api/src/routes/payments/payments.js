const express = require ("express");
const Stripe = require("stripe");
const cors = require("cors");

const app = express()

const stripe = new Stripe("sk_test_51N9XymIq7GOKCNm5vx0tCJemZcitthUTb22WD4gvJo6apMvU6Q30moeVbBcKpiBUKonYRpsNOnmSDiFsOZIlT6fK00tNznIDka")

app.use(cors({origin: 'http://localhost:3000'}))
app.use(express.json())

app.post('/api/checkout', async(req, res) => { 
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

        return res.status(200).json({message: 'Pago realizado'});
    } catch (error) {
        console.log(error)
        return res.json({message: error.raw.message})
    }
    
})

app.listen(3002, ()=>{
    console.log('server on port', 3002)
})