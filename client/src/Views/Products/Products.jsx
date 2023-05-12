import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";


import NavBar from "../../components/Navbar/Navbar"
import Cards from "../../components/Cards/cards";

import { getAllProducts,orderProducts } from "../../redux/actions";


import styles from "./Products.module.css"

function Products() {
    const dispatch = useDispatch()
    const products = useSelector(state => state.allProducts)
    const [order,setOrder] = useState("");

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch])
    

    const handlerOrderProducts = (event) =>{
      dispatch(orderProducts(event.target.value));
      setOrder(`${event.target.value}`);
    }

    return (
      <div className={styles.products}>
        <NavBar />
        <div>
          <br></br>
          <h1 className={styles.h1}>Products</h1>
          <section className={styles.cont}>
            <div className={styles.category}>
              <h5>Categorías</h5>
            </div>
            <div className={styles.cardsCont}>
              <div className={styles.orderBy}>
                <label htmlFor="">ordenar por:</label>
                <select onChange={handlerOrderProducts}>
                  <option value="order" disabled selected>
                    Order
                  </option>
                  <option value="max-min">Precio: Mayor a Menor</option>
                  <option value="min-max">Precio: Menor a Mayor</option>
                  <option value="asc">A-Z</option>
                  <option value="desc">Z-A</option>
                </select>
              </div>
              <Cards products={products} />
            </div>
          </section>
        </div>
      </div>
    );
}
export default Products
