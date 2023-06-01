import style from "./Review.module.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import Star from "../Star/Star";
import { CiMenuKebab } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { getAllReviews } from "../../redux/actions";


const Review = ({datasXProduc,star}) =>{
    const storedToken = localStorage.getItem("token");
    const registeredId = localStorage.getItem("userId");

    const [perfil, setPerfil] = useState({});
    const {comment,qualification, userId, id} = datasXProduc;
    const dispatch = useDispatch();



    


  useEffect(() => {
    const fetchData = async () => {
      if (storedToken && registeredId) {
          await axios
            .get(`http://localhost:3001/user/${userId}`)
              .then((response) => {
                if (response) {
                    setPerfil(response.data);
                }
            });
      }
      };
      fetchData()
  }, []);

    
    const handlerEdit = async() =>{
        
        Swal.fire({
            title: `¿Cual es tu nueva reseña?`,
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Editar',
            showLoaderOnConfirm: true,
            preConfirm: (login) => {
            if(star){
                const reviewEdit = {"comment":login,"qualification":star};
                axios.put(`http://localhost:3001/review/${registeredId}/${id}`,reviewEdit)
                Swal.fire(
                    'Good job!',
                    'Gracias por su nueva reseña',
                    'success'
                  )
                dispatch(getAllReviews());   
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Te faltó algo...',
                    text: "coloca la nueva calificación",
                  })
            }
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(getAllReviews());  
            }
          })
          
    }
    
 


    

    const handlerDelete = async() =>{
        await axios.delete(`http://localhost:3001/review/${registeredId}/${id}`, )
        .then((response) => {
            if(response){
            console.log(response);
            }
        })
        window.location.reload(true);
    }


    return (
        <div className={style.content}>
            <div className={style.boxTop}>
                <div className={style.user}>
                    <div className={style.imageUser}>
                        <img src={perfil.image} alt="user" />
                    </div>
                    <div className={style.nameUser}>
                        <strong>{perfil.name}</strong>
                        <Star score={qualification}/>
                    </div>
                </div>
                <div className={style.dropdown}>
                    <button className={style.button}>
                        <CiMenuKebab/>
                    </button>
                    <div className={style.menu}>
                        {parseInt(registeredId)===userId ? 
                        <ul>
                            <li><button onClick={handlerEdit}>Editar</button></li>
                            <li><button onClick={handlerDelete}>Eliminar</button></li>
                        </ul> : 
                        <ul>
                            <li><button>Reportar</button></li>
                        </ul>}
                    </div>
                </div>
            </div>
            <div className={style.comment}>
                <p>{comment}</p>
            </div>
        </div>
    );
}

export default Review;