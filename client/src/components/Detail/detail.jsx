import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsById } from "../../redux/actions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { SiMercadopago } from "react-icons/si";
import { BsCurrencyBitcoin } from "react-icons/bs";
import Button from "react-bootstrap/Button";

import NavBar from "../Navbar/Navbar";

import styles from "./detail.module.css";

export default function Detail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProductsById(id));
    return () => dispatch({ type: "LIMPIAR_DETAILS" });
  }, [dispatch, id]);

  const myProduct = useSelector((state) => state.idProduct);
  console.log(myProduct)
  const handleDelete = async() => {
    if (window.confirm("¿Estás seguro de eliminarlo?")) {
      await axios
        .delete(`http://localhost:3001/products/${myProduct.id}`)
        .then(alert("se ha eliminado el producto"), navigate("/home"))
    }
  };
  return (
    <div className={styles.detailCont}>
      <NavBar />
      {myProduct ? (
        <section className={styles.productCont}>
          <div className={styles.imageCont}>
            <img className={styles.image} src={myProduct.image} alt="dessert" />
          </div>
          <div className={styles.textCont}>
            <button className={styles.delete} onClick={handleDelete}>
              X
            </button>
            <h3>{myProduct.name}</h3>
            <h4>$ {myProduct.price}</h4>
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
        <section>
          <p>{myProduct.description}</p>
        </section>
      ) : (
        <div></div>
      )}
    </div>
  );
}
