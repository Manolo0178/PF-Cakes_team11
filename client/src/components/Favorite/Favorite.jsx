import React, { useEffect } from "react";
import styles from "./Favorite.module.css";
import axios from "axios"
import {useSortable} from "@dnd-kit/sortable";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";

import {CSS} from "@dnd-kit/utilities";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

const Favorite = ({favorite,getFav}) =>{
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const { name, image, description, price, id } = favorite;
    const URL = "http://localhost:3001/favoritos";
    const [isFav, setisFav] = useState(false);

    useEffect(() => {
        const searchFav = async () => {
          await axios.get(`${URL}/user/${userId}/products`).then((response) => {
            response.data.map((fav) => {
              if (fav.id === id) {
                setisFav(true);
              }
            });
          });
        };
        if (token) {
          searchFav();
        }
      }, []);

  //************ Favorites **************/

  const addFavorite = async () => {
    await axios.post(`${URL}/user/${userId}/product/${id}`);
  };
  const deleteFavorite = async () => {
      await axios.delete(`${URL}/user/${userId}/product/${id}`);
      // if (window.location.pathname === "/favoritos") {
      //   window.location.replace(window.location.href);
      // }
      getFav();
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

    // const {
    //     attributes,
    //     listeners,
    //     setNodeRef,
    //     transform,
    //     transition
    // } = useSortable({
    //     id:favorite.id
    // })

    // const style = {
    //     transform: CSS.Transform.toString(transform),
    //     transition
    // }

    return (
        <div
        // style={style} 
        // ref={setNodeRef}
        // {...attributes}
        // {...listeners}
        className={styles.container}>
            {token &&  isFav ? (
                        <button className={styles.fav} onClick={handleFavorite}>
                          <AiFillHeart className={styles.favIcon} />
                        </button>
                      ) : (
                        (
                          <button className={styles.fav} onClick={handleFavorite}>
                            <AiOutlineHeart className={styles.favIconWhite} />
                          </button>
                        )
            )}
            <div className={styles.cardCont}>
            
            <div className={styles.imageCont}>
                <img className={styles.image} src={image} alt="product" />
                <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.content}>
                
                <h4 className={styles.name}>{name}</h4>
                <Link to={`/home/${id}`} target="_blank">
                    <FaExternalLinkAlt/>
                </Link>
            </div>
                <p className={styles.price}>${price}</p>
            </div>
        </div>
    );
}

export default Favorite;