const express = require('express');
var cors = require("cors");
const { Cart, Product } = require('../../db');
const routerPago = express.Router()
const stripe = require("stripe")(
    "sk_test_51N96FfIYEoppI1739g3vtqr65r8KFcTs8viSrwbD9Zy912N90IDi1t8PTubJxTH6GTmcJQCaN4weCfY96Ja9CvRs00l0ouL1jl"
);

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

routerPago.post("/", async (req, res) => {
    const { price } = req.body;
    let itemCart = await Product.findAll({
        where: { price }
    })

    const session = await stripe.checkout.sessions.create({
        line_items: itemCart,
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel", u
    });

    res.send(
        JSON.stringify({
            url: session.url,
        })
    );
});