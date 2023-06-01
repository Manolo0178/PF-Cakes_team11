import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getAllReviews } from "../../redux/actions";
import style from "./Comment.module.css";
import axios from 'axios';
import Swal from 'sweetalert2';

import Reviews from '../Reviews/Reviews';


const Comment = ({star,handlerValoration}) => {
  const [perfil, setPerfil] = useState({});
  const [access, setAccess] = useState(0);
  const [review, setReview] = useState({
    comment : "",
    qualification:0
  })
  
  
  const storedToken = localStorage.getItem("token");
  const userId = localStorage.getItem("userId")
  const { id } = useParams();
  
  const allReviews = useSelector((state) => state.allReview);
  const dispatch = useDispatch();


  const reviewXProducts = allReviews.filter(review=> review.productId === parseInt(id));
  const reviewXUser = reviewXProducts?.filter(review => review.userId === parseInt(userId));
  
  

  useEffect( () => {
    storedToken && (
       axios.get(`http://localhost:3001/user/${userId}`)
      .then((response) => {
        setPerfil(response.data)
      })
      )

      axios.get(`http://localhost:3001/shops/${userId}`)
      .then((response) => {
        if(response.data){
          let filter = response.data?.filter((element)=>element.userProduct.id===parseInt(id));
          setAccess(filter.length)
        }
      })  

      dispatch(getAllReviews());

      
      
  }, []);

  

  const handleForm = async(e) => {
    e.preventDefault();

    if(!access){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No podes comentar ya que no compraste este producto',
      })
    } else{
      if(reviewXUser.length === parseInt(1)){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Solo podés dar una reseña',
        })  
      } else{
        if (
          review.comment && review.qualification
        ) {
          await axios.post(`http://localhost:3001/review/${userId}/${id}`, review)
          .then((response) => {
            if(response){
              console.log(response);
            }
          })
          Swal.fire(
            'Good job!',
            'Gracias por su reseña',
            'success'
          )
          dispatch(getAllReviews());
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Algo sucedió...',
            text: 'No colocaste la reseña o calificación :(',
          }) 
        }
      }
    }
  };



  const handleInputChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setReview({ ...review,"qualification":star, [property]: value })
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
      <Reviews reviewXProducts={reviewXProducts} star={star}/>
    </div>
  );
};

export default Comment;