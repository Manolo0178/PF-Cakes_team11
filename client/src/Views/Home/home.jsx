import styles from "./home.module.css"

import React from "react"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom";

import NavBar from "../../components/Navbar/Navbar"
import CarouselSlide from "../../components/Carousel/Carousel"
import Cards from "../../components/Cards/cards";


import { getAllProducts } from "../../redux/actions";


function Home() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.allProducts);
    
    useEffect(() => {
        dispatch(getAllProducts())
    }, [dispatch])
    
    products.length=12
    return (
      <div className={styles.homeCont}>
            <NavBar />
            <CarouselSlide />
            <section className={styles.cardsCont}>
                <h3>Algunos de nuestros productos</h3>
                <Cards products={products} />
                <Link to="/products">ver más</Link>
            </section>
      </div>
    );
}
export default Home