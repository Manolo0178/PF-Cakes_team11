import styles from "./home.module.css"

import React from "react"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom";

import Navbar from "../../components/Navbar/Navbar"
import CarouselSlide from "../../components/Carousel/Carousel"
import Cards from "../../components/Cards/cards";


import { getAllProducts } from "../../redux/actions";


function Home() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.getAllProducts);
    
    useEffect(() => {
        dispatch(getAllProducts())
    }, [dispatch])
    
    return (
        <div className={styles.homeCont}>
            <Navbar />
            <CarouselSlide />
            <section className={styles.cardsCont}>
                <Cards products={products} />
                <Link to="/products">ver más</Link>
            </section>
      </div>
    );
}
export default Home