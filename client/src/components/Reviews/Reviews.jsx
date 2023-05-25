import style from "./Reviews.module.css"
import Review from "../Review/Review";

const Reviews = ({reviewXProducts, star}) =>{
    return(
        <div className={style.content}>
            {reviewXProducts.length !==0 && reviewXProducts?.map((datasXProduc, index) => {
                return (
                    <Review datasXProduc={ datasXProduc } star={star} key={index}/>
                )
            })}
        </div>
    );
}

export default Reviews;