import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsById } from "../../redux/actions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { SiMercadopago } from "react-icons/si";
import { BsCurrencyBitcoin } from "react-icons/bs";
import { HiPencilAlt } from "react-icons/hi";

import Button from "react-bootstrap/Button";

import NavBar from "../Navbar/Navbar";

import styles from "./detail.module.css";
import { changeDetails } from "../../redux/actions";
export default function Detail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProductsById(id));
    return () => dispatch({ type: "LIMPIAR_DETAILS" });
  }, [dispatch, id]);

  const myProduct = useSelector((state) => state.idProduct);

  const handleDelete = async() => {
    if (window.confirm("¿Estás seguro de eliminarlo?")) {
      await axios
        .delete(`http://localhost:3001/products/${myProduct.id}`)
        .then(alert("se ha eliminado el producto"), navigate("/Products"))
    }
  };


//*********** handle changes *************

  const changeImage = () => {
    let img = prompt("¿Que imágen desea colocarle?", `${myProduct.image}`);
    dispatch(changeDetails({ image: img }, myProduct.id));
    window.location.reload(true);
  }
  const changeName = () => {
    let named = prompt("¿Que nombre desea colocarle?", `${myProduct.name}`);
    dispatch(changeDetails({ name: named }, myProduct.id));
    window.location.reload(true);
  }
  const changePrice = () => {
    let priced = prompt("¿Que precio desea colocarle?", `${myProduct.price}`);
    dispatch(changeDetails({ price: priced }, myProduct.id));   
    window.location.reload(true);
  }
  const changeDescription = () => {
    let desc = prompt("¿Que descripción desea colocarle?", `${myProduct.description}`);
    dispatch(changeDetails({ description: desc }, myProduct.id));
    window.location.reload(true);
  }



  return (
    <div className={styles.detailCont}>
      <NavBar />
      {myProduct ? (
        <section className={styles.productCont}>
          <div className={styles.imageCont}>
            <img className={styles.image} src={myProduct.image} alt="dessert" />
            <button onClick={changeImage} className={styles.imageButton}>
              <HiPencilAlt />
            </button>
          </div>
          <div className={styles.textCont}>
            <button className={styles.delete} onClick={handleDelete}>
              X
            </button>
            <div className={styles.nameCont}>
              <h3>{myProduct.name}</h3>
              <button onClick={changeName} className={styles.nameButton}>
                <HiPencilAlt />
              </button>
            </div>
            <div className={styles.priceCont}>
              <h4>$ {myProduct.price}</h4>
              <button onClick={changePrice} className={styles.priceButton}>
                <HiPencilAlt />
              </button>
            </div>
            <div>
              <div className={styles.iconsCont}>
                <SiMercadopago size="1.5rem" />
                <BsCurrencyBitcoin size="1.5rem" />
              </div>
              <p>Ver medios de Pago</p>
            </div>
            <div className={styles.cantCont}>
              <label htmlFor="">Cantidad</label>
              <input type="number" />
            </div>
            <div className={styles.buttonCont}>
              <Button variant="primary">Agregar al carrito</Button>{" "}
            </div>
          </div>
        </section>
      ) : (
        <p>Loading..</p>
      )}
      {myProduct ? (
        <section className={styles.descriptionCont}>
          <p>{myProduct.description}</p>
          <button
            onClick={changeDescription}
            className={styles.descriptionButton}
          >
            <HiPencilAlt />
          </button>
        </section>
      ) : (
        <div></div>
      )}
    </div>
  );
}
