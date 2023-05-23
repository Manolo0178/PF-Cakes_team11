import React from 'react';
import style from "./Qualification.module.css";
import { useState } from 'react';


const Qualification = ({handlerStar}) =>{

    
    return(
        <div className={style.container}>
            <h2>Calificación</h2>
            <div className={style.rating}>
                <input type="radio" name='star' value={5} onChange={(e) => handlerStar(e.target.value)}/>
                <input type="radio" name='star' value={4} onChange={(e) => handlerStar(e.target.value)}/>
                <input type="radio" name='star' value={3} onChange={(e) => handlerStar(e.target.value)}/>
                <input type="radio" name='star' value={2} onChange={(e) => handlerStar(e.target.value)}/>
                <input type="radio" name='star' value={1} onChange={(e) => handlerStar(e.target.value)}/>
            </div> 
        </div>
    )
}

export default Qualification;