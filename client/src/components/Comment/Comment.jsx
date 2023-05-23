import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import style from "./Comment.module.css";
import axios from 'axios';

import Reviews from '../Reviews/Reviews';


const Comment = ({star}) => {
  const [perfil, setPerfil] = useState({});
  const [review, setReview] = useState({
    comment : "",
    qualification:0,
    productId:0,
    userId:0
  })
  
  
  const storedToken = localStorage.getItem("token");
  const userId = localStorage.getItem("userId")
  const { id } = useParams();

  useEffect( () => {
    storedToken && (
       axios.get(`http://localhost:3001/user/${userId}`)
      .then((response) => {
        setPerfil(response.data)
      })
      )
      
  }, []);


  const handleForm = async(e) => {
    e.preventDefault()
    if (
      review.comment
    ) {
      await axios.post("http://localhost:3001/review", review)
      .then((response) => {
        if(response){
          console.log(response);
        }
      })
    }
    window.location.reload(true);
  };



  const handleInputChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setReview({ ...review,"qualification":star, "productId": parseInt(id), "userId": perfil.id,[property]: value })
  };
  

  return (
    <div className={style.content}>
      <h2>Reseñas</h2>
      <form onSubmit={handleForm}>
        <div className={style.contentForm}>
            <textarea onChange={handleInputChange} className={style.textarea} value={review.comment} name="comment" placeholder="Escribe tu comentario..." />
            <button  type="submit" className={style.button}>Enviar</button>
        </div>
      </form>
      <Reviews/>
    </div>
  );
};

export default Comment;