
import {AiFillStar,AiOutlineStar} from "react-icons/ai";

const Star = ({score}) =>{
    return (
        <div>
            {
                [...new Array(5)].map((star,index)=>{
                    return index < score ? <AiFillStar/> : <AiOutlineStar/>
                })
            }
        </div>
    );
}

export default Star;