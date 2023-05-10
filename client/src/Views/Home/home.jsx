import React from "react"

import Navbar from "../../components/Navbar/Navbar"
import CarouselSlide from "../../components/Carousel/Carousel"

import styles from "./home.module.css"

function Home() {

    return (
        <div className={styles.homeCont}>
            <Navbar />
            <CarouselSlide/>
      </div>
    );
}
export default Home