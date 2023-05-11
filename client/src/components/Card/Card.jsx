import React from "react";

function Card({ product }) {
    const {name, image, description, price}=product
    return (
        <div>
            <img src={image} alt="product" />
            <h4>{name}</h4>
            <p>{price}</p>
            <p>{description}</p>
      </div>
  );
}
export default Card;
