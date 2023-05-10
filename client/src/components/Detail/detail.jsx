import React from "react";
import {Link, useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsById } from "../actions/index";
import { useEffect } from "react";

export default function Detail(){
    
    const dispatch = useDispatch()
    
    const {id} = useParams()
    
    useEffect(() => {
        dispatch(getProductsById(id));
        return(() => dispatch({type:"LIMPIAR_DETAILS"}))
    },[])
    
    const myProduct = useSelector ((state) => state.idProduct)
    console.log(myProduct)
    //detail de mierda
    return(
        <div>
            {
                myProduct.length>0 ?
                <div>
                    <h1>{myProduct.name}</h1>
                    <h2>{myProduct.price}</h2>
                    <img src={myProduct[0].image? myProduct[0].image : myProduct[0].image} alt="" width="500px" height="700px" />
                    <h3>Descripcion: {myProduct[0].description}</h3>

                </div> : <p>Loading..</p>

            }
            <Link to='/home'>
            <button>Volver</button>
            </Link> 
        </div>
    )
}
  