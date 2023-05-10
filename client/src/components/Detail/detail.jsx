import React from "react";
import {Link, useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/index";
import { useEffect } from "react";

export default function Detail(){
    
    const dispatch = useDispatch()
    
    const {id} = useParams()
    
    useEffect(() => {
        dispatch(getDetail(id));
        return(() => dispatch({type:"LIMPIAR_DETAILS"}))
    },[dispatch, id])
    
    const myProduct = useSelector ((state) => state.detail)
    console.log(myProduct)

    return(
        <div>
            {
                myProduct.length>0 ?
                <div>
                <h1>{myProduct.name}</h1>
                <h1>{myProduct.price}</h1>
                <img src={myProduct[0].img? myProduct[0].img : myProduct[0].image} alt="" width="500px" height="700px" />
                <h2>Descripcion: {myProduct[0].description}</h2>

                </div> : <p>Loading..</p>

            }
            <Link to='/home'>
            <button>Volver</button>
            </Link> 
        </div>
    )
}
  