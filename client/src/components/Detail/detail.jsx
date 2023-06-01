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
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";

import Button from "react-bootstrap/Button";

import NavBar from "../Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Comment from "../Comment/Comment";
import Qualification from "../Qualification/Qualification";
import styles from "./detail.module.css";
import {AiFillStar} from "react-icons/ai";
import Swal from "sweetalert2";
import { changeDetails, addToCart,getAllReviews, getUserData,getCart } from "../../redux/actions";
import ChangeDetail from "../ChangeDetail/ChangeDetail";
import Spinner from "react-bootstrap/Spinner";


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
  const [isFav, setisFav] = useState(false);
  const [favorite, setFavorite] = useState({});


//************* Change Detail ***************/
  const [visible, setVisible] = useState(false);
  const [detail, setDetail] = useState({})
  const [form, setForm] = useState({
    name: "",
    price: 0,
    description: "",
    summary:"",
  })
  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [property]: value });
  };
  const handleCancel = () => {
    if(visible) setVisible(false)
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(changeDetails(form, myProduct.id));
    window.location.reload(true);
  };


console.log(!!storedToken);






//**************************** */
  
  let count = 0;
  
  
  reviewXProducts.forEach(element => count += element.qualification);


  const handlerStar = (point) =>{
    setStar(point)
  }

  useEffect(() => {
    const searchFav = async () => {
      await axios.get(`http://localhost:3001/favoritos/user/${userId}/products`).then((response) => {
        response.data.map((fav) => {
          if (fav.id === parseInt(id)) {
            setisFav(true);
            setFavorite(fav);
          }
        });
      });
    };
    if (storedToken) {
      searchFav();
    }
  }, []);

  const addFavorite = async () => {
    await axios.post(`http://localhost:3001/favoritos/user/${userId}/product/${id}`);
  };
  const deleteFavorite = async () => {
      await axios.delete(`http://localhost:3001/favoritos/user/${userId}/product/${id}`);
      if (window.location.pathname === "/favoritos") {
        window.location.replace(window.location.href);
      }
  };

  const handleFavorite = () => {
    if (isFav) {
      setisFav(false);
      deleteFavorite(id);
    } else {
      setisFav(true);
      addFavorite();
    }
  };




  const handleAddToCart = () => {
    if (!storedToken) {
      // El usuario no ha iniciado sesión
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
          dispatch(getCart(userId));
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
          {!storedToken  ?  <p></p> : isFav ? (
            <button className={styles.fav} onClick={handleFavorite}>
              <AiFillHeart className={styles.favIcon} />
            </button>
          ) : (
              <button className={styles.fav} onClick={handleFavorite}>
                <AiOutlineHeart className={styles.favIconWhite} />
              </button>
          )}
            {myProduct.image ? (
              <img
                className={styles.image}
                src={myProduct.image}
                alt="dessert"
              />
            ) : (
              <Spinner
                animation="border"
                role="status"
                style={{ position: "absolute", top: "38%", left: "36%" }}
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}

            <input type="file" name="image" onChange={changeImage} />
            {userData.role && userData.role === "admin" ? (
              <HiPencilAlt className={styles.imageButton} />
            ) : null}
          </div>

          <div className={styles.textCont}>
            {userData.role && userData.role === "admin" ? (
              <div className={styles.adminCont}>
                <button className={styles.delete} onClick={handleDelete}>
                  X
                </button>
                <button
                  onClick={() => {
                    setDetail(myProduct);
                    if (!visible) {
                      setVisible(true);
                    }
                  }}
                  className={styles.descriptionButton}
                >
                  <HiPencilAlt color="white" />
                </button>
              </div>
            ) : null}

            <div className={styles.nameCont}>
              <h3>{myProduct.name}</h3>
            </div>
            <div className={styles.priceCont}>
              <h4>$ {myProduct.price}</h4>
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
      {myProduct && (
        <section className={styles.descriptionCont}>
          <p>Descripción: {myProduct.description}</p>
          <p>Ingredientes: {myProduct.summary}</p>
        </section>
      )}
      {visible && (
        <ChangeDetail
          handleChange={handleChange}
          handleCancel={handleCancel}
          handleSubmit={handleSubmit}
          detail={detail}
        />
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
