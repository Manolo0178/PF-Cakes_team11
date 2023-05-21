
import {AiFillStar,AiOutlineStar} from "react-icons/ai";

const Star = ({score}) =>{
    return (
        <div>
            {
                [...new Array(5)].map((star,index)=>{
                    return index < score ? <AiFillStar key={index}/> : <AiOutlineStar key={index}/>
                })
            }
        </div>
    );
}

export default Star;