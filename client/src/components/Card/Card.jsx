import React from "react";
import styles from "./Card.module.css"
import { Link } from "react-router-dom";
function Card({ product }) {
    const {name, image, description, price, id}=product
    return (
        <Link className={styles.cardCont} to={`/home/${id}`}>
            <div className={styles.imageCont}>
                <img className={styles.image} src={image} alt="product" />
            </div>
            <h4 className={styles.name}>{name}</h4>
            <p className={styles.price}>${price}</p>
            <p className={styles.description}>{description}</p>
      </Link>
  );
}
export default Card;
