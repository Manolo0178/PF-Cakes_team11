const express = require("express");
const reviewRouter = express.Router();
const { Review, User } = require('../../db.js')

reviewRouter.get('/', async (req, res)=>{
    try {
        const allReview = await Review.findAll()

        res.status(200).json(allReview)
        }
    catch (error) {
        res.status(500).json({message: error.message})
    }
})


reviewRouter.put('/:idUser/:reviewId', async (req, res) => {
    try {
        const { reviewId, idUser } = req.params;
        const { comment, qualification } = req.body;
        
        const review = await Review.findByPk(reviewId);
        
        if(review.userId === idUser){
            await Review.update(
                {comment, qualification},
                {where:{id: reviewId}}
            )
            res.json({message: 'se actualizo el comentario'})
        }else{
            res.status(400).json({message: 'no autorizado'})
        }
    } catch (error) {
        res.status(500).json({message:error.message})        
    }
})

reviewRouter.delete('/:idUser/:idReview', async (req, res) => {
    try {
        const { idUser, idReview } = req.params;

        const review = await Review.findByPk(idReview);
    
    console.log(review.userId, idUser);
        if(review.userId == idUser) {
            await review.destroy();
            res.json({ message: 'Comentario eliminado' });
        } else {
            res.status(401).json({ message: 'No autorizado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

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