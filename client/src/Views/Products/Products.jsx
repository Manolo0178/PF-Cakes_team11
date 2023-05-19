import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import NavBar from "../../components/Navbar/Navbar";
import Cards from "../../components/Cards/cards";
import Pagination from "../../components/Pagination/Pagination";
import Footer from "../../components/Footer/Footer";

import {
  getAllProducts,
  orderProducts,
  getDessert,
  filterProducts,
} from "../../redux/actions";

import styles from "./Products.module.css";

function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProducts);
  const [order, setOrder] = useState("");
  const desserts = useSelector((state) => state.dessert);

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getDessert());
  }, [dispatch]);

  const handlerOrderProducts = (event) => {
    dispatch(orderProducts(event.target.value));
    setOrder(`${event.target.value}`);
  };

  const handleFilter = (event) => {
    dispatch(filterProducts(event.target.value));
    setOrder(`${event.target.value}`);
  };

  //********* pagination **********/
  const [page, setPage] = useState(1);
  const [cardsPage] = useState(9);
  const lastCard = page * cardsPage;
  const firstCard = lastCard - cardsPage;
  let cards = products.slice(firstCard, lastCard);
  const paginate = (pag) => {
    setPage(pag);
  };
  const previousChange = () => {
    if (page > 1) setPage(page - 1);
  };
  const nextChange = () => {
    if (products.length > lastCard) setPage(page + 1);
  };

  return (
    <div className={styles.products}>
      <NavBar />
      <div>
        <h1 className={styles.h1}>Products</h1>
        <Pagination
          cardsPage={cardsPage}
          paginate={paginate}
          page={page}
          allCards={products.length}
          nextChange={nextChange}
          previousChange={previousChange}
        />
        <section className={styles.cont}>
          <div className={styles.categoryBox}>
            <div className={styles.category}>
              <h5>Categorías</h5>
              <select onChange={handleFilter}>
                <option value="all">Todos</option>
                {desserts?.map((des, index) => (
                  <option key={index} value={des}>
                    {des}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.orderBy}>
              <h5>Ordenamiento</h5>
              <select onChange={handlerOrderProducts} value="order">
                <option value="order" disabled>
                  Orden
                </option>
                <option value="min-max">Precio: Menor a Mayor</option>
                <option value="max-min">Precio: Mayor a Menor</option>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
              </select>
            </div>
          </div>
          <div className={styles.cardsCont}>
            <Cards products={cards} />
          </div>
        </section>
        <Pagination
          cardsPage={cardsPage}
          paginate={paginate}
          page={page}
          allCards={products.length}
          nextChange={nextChange}
          previousChange={previousChange}
        />
        <Footer />
      </div>
    </div>
  );
}
export default Products;
