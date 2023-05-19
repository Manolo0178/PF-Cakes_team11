import style from "./Reviews.module.css"
import { useParams } from 'react-router-dom';
import Review from "../Review/Review";

const Reviews = ({datas}) =>{
    const { id } = useParams();
    const datasXProducs = datas.filter(data=> data.productId == id)
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