import React from "react";
import styles from "./Card.module.css"

function Card({ product }) {
    const {name, image, description, price}=product
    return (
        <div className={styles.cardCont}>
            <img className={styles.image} src={image} alt="product" />
            <h4 className={styles.name}>{name}</h4>
            <p className={styles.price}>{price}</p>
            <p className={styles.description}>{description}</p>
      </div>
  );
}
export default Card;
