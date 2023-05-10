import React from "react";

function Card({product}) {
    const { name, image, precio } = product;
    return (
        <div>
            <img src={image} alt="product" />
            <h3>{name}</h3>
            <p>{precio}</p>
            <button>agregar al carrito</button>
        </div>
    )
}
export default Card

