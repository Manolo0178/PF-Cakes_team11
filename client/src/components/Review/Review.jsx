import style from "./Review.module.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import Star from "../Star/Star";



const Review = ({datasXProduc}) =>{
    const [perfil, setPerfil] = useState({});
    const {comment,qualification,userId} = datasXProduc;
    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.allReview);

    const storedToken = localStorage.getItem("token");



  useEffect( () => {
    storedToken && (
       axios.get(`http://localhost:3001/user/${userId}`)
      .then((response) => {
        setPerfil(response.data)
      })
      )
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