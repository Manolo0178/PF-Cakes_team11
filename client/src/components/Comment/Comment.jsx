import React, { useState } from 'react';
import style from "./Comment.module.css";

import Reviews from '../Reviews/Reviews';


const Comment = () => {
  const [comments, setComments] = useState([]);
  const [reviews, setReviews] = useState([])
  

  const datas = [
  {
    "comment":"Estuvo muy bueno",
    "calificacion":5,
    "productId":12,
    "userId":2
  },
  {
    "comment":"Estuvo bueno la verdad ssss ssss ssss sss ssss ssss ssss sss ssss ssss",
    "calificacion":4,
    "productId":11,
    "userId":2
  },
  {
    "comment":"No me gusto",
    "calificacion":1,
    "productId":10,
    "userId":2
  },
  {
    "comment":"Estuvo Rico",
    "calificacion":4,
    "productId":14,
    "userId":2
  },
  {
    "comment":"No me gusto mucho",
    "calificacion":2,
    "productId":11,
    "userId":3
  },
]

  const handleForm = (e) => {
    e.preventDefault();
    const newComment = {"author":comments.author,"content":comments.content}

    setReviews([...reviews, newComment]);
  };

  const handleInputChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setComments({ ...comments, [property]: value });

  };
  

  return (
    <div className={style.content}>
      <h2>Reseñas</h2>
      {/* <ul>
        {reviews.length!==0 && reviews?.map((review, index) => (
          <li key={index}>
            <strong>{review.author}</strong>: {review.content}
          </li>
        ))}
      </ul> */}
      <form>
        <div className={style.contentForm}>
            <input onChange={handleInputChange} className={style.input} value={comments.author} name="author" placeholder="Autor" />
            <input onChange={handleInputChange} className={style.input} value={comments.comment} name="content" placeholder="Escribe tu comentario" />
            <button onClick={handleForm} className={style.button}>Enviar</button>
        </div>
      </form>
      <Reviews datas={datas}/>
    </div>
  );
};

export default Comment;