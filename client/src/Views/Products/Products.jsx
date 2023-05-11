import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";


import NavBar from "../../components/Navbar/Navbar"
import Cards from "../../components/Cards/cards";

import { getAllProducts } from "../../redux/actions";

import styles from "./Products.module.css"

function Products() {
    const dispatch = useDispatch()
    const products = useSelector(state => state.allProducts)

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch])
    

    return (
      <div className={styles.products}>
        <NavBar />
        <div>
          <h1>Products</h1>
          <section className={styles.cont}>
            <div className={styles.category}>
              <h5>Categorías</h5>
            </div>
            <div className={styles.cardsCont}>
                <div className={styles.orderBy}>
                    <label htmlFor="">ordenar por:</label>
                    <select>
                        <option value="">Precio: Menor a Mayor</option>
                        <option value="">Precio: Mayor a Menor</option>
                        <option value="">A-Z</option>
                        <option value="">Z-A</option>
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