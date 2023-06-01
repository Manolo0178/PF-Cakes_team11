import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsById } from "../../redux/actions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import { SiMercadopago } from "react-icons/si";
import { HiPencilAlt } from "react-icons/hi";

import Button from "react-bootstrap/Button";

import NavBar from "../Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Comment from "../Comment/Comment";
import Qualification from "../Qualification/Qualification";
import styles from "./detail.module.css";
import {AiFillStar} from "react-icons/ai";
import Swal from "sweetalert2";
import { changeDetails, addToCart, getAllReviews, getUserData } from "../../redux/actions";



export default function Detail() {
  const userId = localStorage.getItem("userId");
  const storedToken = localStorage.getItem('token');
  const myProduct = useSelector((state) => state.idProduct);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [star, setStar] = useState(0);
  const { userData } = useSelector((state)=> state)
  const allReviews = useSelector((state) => state.allReview);
  const reviewXProducts = allReviews.filter(review=> review.productId === parseInt(id));
  
  let count = 0;
  
console.log(userData)
  reviewXProducts.forEach(element => count += element.qualification);


  const handlerStar = (point) =>{
    setStar(point)
  }



  const handleAddToCart = () => {
    if (!storedToken) {
      Swal.fire({
        title: "Debes iniciar sesión primero",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    } else {
      dispatch(addToCart(id, userId));
      Swal.fire({
        title: "El producto se agregó al carrito",
        icon: "success",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload(true);
        }
      });
    }
  };

  useEffect(() => {
    dispatch(getUserData(storedToken ,userId))
    dispatch(getProductsById(id));
    dispatch(getAllReviews());

    return () => dispatch({ type: "LIMPIAR_DETAILS" });
  }, [dispatch, id]);

  


  const handleDelete = () => {
    Swal.fire({
      title: "¿Estás seguro de eliminarlo?",
      icon: "question",
      showDenyButton:"true",
      confirmButtonText: "Si",
      denyButtonText:"No"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .delete(`http://localhost:3001/products/${myProduct.id}`)
          .then(
            navigate("/Products"),
            setTimeout(() => {
              Swal.fire({
                title: "Se eliminó exitosamente",
                icon: "success",
                showConfirmButton:false,
                timer:1500,
              })
            },500)
          );
      }
    });
  };


//*********** handle changes *************
  const changeName = async() => {
    let named = prompt("¿Que nombre desea colocarle?", `${myProduct.name}`);
    dispatch(changeDetails({ name: named }, myProduct.id));
    if (named) {
      window.location.reload(true);
    }
  }
  const changePrice = () => {
    let priced = prompt("¿Que precio desea colocarle?", `${myProduct.price}`);
    dispatch(changeDetails({ price: priced }, myProduct.id));   
    if (priced) {
      window.location.reload(true);
    }
  }
  const changeDescription = () => {
    let desc = prompt("¿Que descripción desea colocarle?", `${myProduct.description}`);
    dispatch(changeDetails({ description: desc }, myProduct.id));
    if (desc) {
      window.location.reload(true);
    }
  }


  const changeImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    if (!file) {
      return;
    }
    reader.onload = async (event) => {
      const imgChange = event.target.result;
      console.log(imgChange);
      dispatch(changeDetails({ image: imgChange }, myProduct.id));
      window.location.reload(true)
    };

    reader.readAsDataURL(file);
  };


  return (
    <div className={styles.detailCont}>
      <NavBar />
      {myProduct ? (
        <section className={styles.productCont}>
          <div className={styles.imageCont}>
            <img className={styles.image} src={myProduct.image} alt="dessert" />
            <input type="file" name="image" onChange={changeImage} />
           { userData.role && userData.role === "admin"? <HiPencilAlt className={styles.imageButton} /> : null}
          </div>
          <div className={styles.textCont}>
            { userData.role && userData.role === "admin"?<button className={styles.delete} onClick={handleDelete}>
              X
            </button> : null }
            <div className={styles.nameCont}>
              <h3>{myProduct.name}</h3>
             { userData.role && userData.role === "admin" ? <button onClick={changeName} className={styles.nameButton}>
                <HiPencilAlt />
              </button> : null }
            </div>
            <div className={styles.priceCont}>
              <h4>$ {myProduct.price}</h4>
             { userData.role && userData.role === "admin" ? <button onClick={changePrice} className={styles.priceButton}>
                <HiPencilAlt />
              </button> : null}
            </div>
            <div>
              <div className={styles.iconsCont}>
                <SiMercadopago size="1.5rem" />
              </div>
              <p>Ver medios de Pago</p>
            </div>
            <div className={styles.cantCont}>
              <label htmlFor="">Cantidad</label>
              <input type="number" min="0" defaultValue="1" />
            </div>
            <div className={styles.buttonCont}>
              {/* <Button
                variant="primary"
              >
                Comprar
              </Button>{" "} */}
              <Button
                variant="primary"
                onClick={() => handleAddToCart(myProduct)}
              >
                Agregar al carrito
              </Button>{" "}
            </div>
          </div>
        </section>
      ) : (
        <p>Loading..</p>
      )}
      {myProduct ? (
        <section className={styles.descriptionCont}>
          <p>{myProduct.description}</p>
         { userData.role && userData.role === "admin"? <button
            onClick={changeDescription}
            className={styles.descriptionButton}
          >
            <HiPencilAlt color="black" />
          </button> : null }
        </section>
      ) : (
        <div></div>
      )}

      <div>
        <h2>Valoración del producto</h2>
        {reviewXProducts.length ? (
          <div className={styles.valoration}>
            <p>{(count / reviewXProducts.length).toFixed(1)}</p>
            <AiFillStar className={styles.star} />
          </div>
        ) : (
          <div>
            <h4>Todavia no hay valoración</h4>
          </div>
        )}
      </div>
      <Qualification handlerStar={handlerStar} />
      <Comment star={star} />
      <Footer />
    </div>
  );
}
