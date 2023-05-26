import React, { useEffect } from "react";
import styles from "./Card.module.css"
import { Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { useState } from "react";
import axios from "axios"



function Card({ product }) {
    const { name, image, description, price, id} = product
    const URL=""

    useEffect(() => {
        const searchFav = async () => {
            await axios.get(URL)
                .then((response) => {
                    if (response.id===id) {
                        setisFav(true)
                }
            })
        }

    },[])

//************ Favorites **************/
    const [isFav, setisFav] = useState(false);
    const addFavorite = async () => {
        await axios.post(URL,id)
    };
    const deleteFavorite = async() => {
        await axios.delete(URL,id)
    };

    const handleFavorite = () => {
      if (isFav) {
        setisFav(false);
        deleteFavorite(id);
      } else {
        setisFav(true);
        addFavorite({});
      }
    };

    return (
        <div>
            {
                isFav ? (
                <button className={styles.fav} onClick={handleFavorite}><AiFillHeart/></button>
                ) : (
                <button className={styles.fav} onClick={handleFavorite}><AiOutlineHeart/></button>
                )
            }         
            <Link className={styles.cardCont} to={`/home/${id}`}>
                <div className={styles.imageCont}>
                    <img className={styles.image} src={image} alt="product" />
                    <p className={styles.description}>{description}</p>
                </div>
                <h4 className={styles.name}>{name}</h4>
                <p className={styles.price}>${price}</p>
            </Link>
    </div>
  );
}
export default Card;
