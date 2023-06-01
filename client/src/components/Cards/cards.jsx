import React from "react";
import Card from "../Card/Card";
import styles from "./cards.module.css"
function Cards({ products }) {
    return (
        <div className={styles.cardsCont}>
            {products?.map(product => {
                return (
                    <Card product={ product } key={product.id} />
                )
            })}
        </div>
    )
}
export default Cards
