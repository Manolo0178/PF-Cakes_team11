import React from "react";
import Card from "../Card/Card";



function Cards({ products }) {
    
    return (
        <div>
            {products?.map(product => {
                return (
                    <Card product={product} key={product.id} />
                )
            })}

        </div>
  );
}
export default Cards;
