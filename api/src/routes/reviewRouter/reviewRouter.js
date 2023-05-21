const express = require("express");
const reviewRouter = express.Router();
const { Review } = require('../../db.js')

reviewRouter.get('/', async (req, res)=>{
    try {
        const allReview = await Review.findAll()

        res.status(200).json(allReview)
        }
    catch (error) {
        res.status(500).json({message: error.message})
    }
})


reviewRouter.post('/', async (req, res) => {
    try {
        const { comment, qualification, productId, userId } = req.body
        const newReview = await Review.create({
            comment,
            qualification,
            productId,
            userId
        })
        res.status(200).json(newReview);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})
module.exports = reviewRouter;