import style from "./Review.module.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import Star from "../Star/Star";



const Review = ({datasXProduc}) =>{
    const storedToken = localStorage.getItem("token");
    const id = localStorage.getItem("userId");

    const [perfil, setPerfil] = useState({});

    const {comment,qualification} = datasXProduc;

    


  useEffect(() => {
    const fetchData = async () => {
      if (storedToken && id) {
          await axios
            .get(`http://localhost:3001/user/${id}`)
              .then((response) => {
                if (response) {
                    setPerfil(response.data);
                }
            });
      }
      };
      fetchData()
  }, []);




    return (
        <div className={style.content}>
            <div className={style.boxTop}>
                <div className={style.user}>
                    <div className={style.imageUser}>
                        <img src={perfil.image} alt="user" />
                    </div>
                    <div className={style.nameUser}>
                        <strong>{perfil.name}</strong>
                    </div>
                </div>
                <div className={style.calification}>
                    <Star score={qualification}/>
                </div>
            </div>
            <div className={style.comment}>
                <p>{comment}</p>
            </div>
        </div>
    );
}

export default Review;