import style from "./Reviews.module.css"
import { useParams } from 'react-router-dom';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllReviews } from "../../redux/actions";
import Review from "../Review/Review";

const Reviews = () =>{
    const { id } = useParams();
    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.allReview);

    useEffect(() => {
        dispatch(getAllReviews())
    }, [dispatch])

     const datasXProducs = reviews.filter(review=> review.productId === parseInt(id))
     
    return(
        <div className={style.content}>
            {datasXProducs.length !==0 && datasXProducs?.map((datasXProduc, index) => {
                return (
                    <Review datasXProduc={ datasXProduc } key={index}/>
                )
            })}
        </div>
    );
}

export default Reviews;