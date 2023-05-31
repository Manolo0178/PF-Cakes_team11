import React from 'react'
import NavBar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import MiPerfilNav from '../miPerfil/MiPerfilNav/MiPerfilNav';
import styles from "./MisCompras.module.css"
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getShops } from '../../redux/actions';
import Card from "../../components/Card/Card"

const MisCompras = () => {
  const idUser = localStorage.getItem("userId");
  const { shops } = useSelector(state => state)
  const dispatch = useDispatch()
  const favorite = true
 
  useEffect(() => {
    dispatch(getShops(idUser));
  }, [dispatch])
  return (
    <div className={styles.cont}>
      <NavBar />
      <section className={styles.sectionCont}>
        <MiPerfilNav />
        <div className={styles.comprasCont}>
          <h1>Historial de Compras</h1>
          <div className={styles.contShop}>
            {shops &&
              shops?.map((product) => (
                <div>
                  <div><h4>Fecha de compra:</h4>{new Date(product.shop.createdAt).toLocaleString()}</div>
                  <Card
                    key={product.userProduct.id}
                    product={product.userProduct}
                    pritotal={product.shop.price}
                    cantidad={product.shop.cantidad}
                    favorite={favorite}
                  />

                </div>
              ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default MisCompras