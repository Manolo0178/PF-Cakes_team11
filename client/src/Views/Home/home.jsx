import styles from "./home.module.css"

import React from "react"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import NavBar from "../../components/Navbar/Navbar"
import CarouselSlide from "../../components/Carousel/Carousel"
import Cards from "../../components/Cards/cards";
import Footer from "../../components/Footer/Footer";

import { getAllProducts } from "../../redux/actions";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function Home() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.allProducts);
    
    useEffect(() => {
        dispatch(getAllProducts())
    }, [dispatch])
    
    products.length = 12
    
    const navigate = useNavigate()
    const navigation = () => {
        navigate("/Products")
    }
    return (
      <div className={styles.homeCont}>
        <NavBar />
        <CarouselSlide />
        <section className={styles.cardsCont}>
          <h3>Algunos de nuestros productos</h3>
          <Cards products={products} />
          <div className={styles.buttonCont}>
            <Button onClick={navigation} variant="primary">
              Ver mas productos
            </Button>{" "}
          </div>
        </section>
        <Footer />
      </div>
    );
}
export default Home