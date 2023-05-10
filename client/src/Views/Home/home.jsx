import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

import Navbar from "../../components/Navbar/Navbar"
import CarouselSlide from "../../components/Carousel/Carousel"


import { getAllProducts } from "../../redux/actions/index";

import styles from "./home.module.css"
import Cards from "../../components/Cards/cards"

function Home() {
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.allProducts);
    
    useEffect(() => {
      dispatch(getAllProducts());
    }, []);    
    
    const products = allProducts.slice(0,9)
    return (
      <div className={styles.homeCont}>
            <Navbar />
            <section className={styles.carouselCont}>
                <CarouselSlide />
                <div>
                    <Cards products={products} />
                    <button>Ver todos los productos</button>
                </div>
            </section>
      </div>
    );
}
export default Home