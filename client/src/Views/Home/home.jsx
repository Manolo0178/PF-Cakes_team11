import React from "react"
import { useState } from "react"

import Navbar from "../../components/Navbar/Navbar"

import styles from "./home.module.css"

function Home() {
    const images = ["carrousel1.jpg", "carrousel2.jpg", "carrousel3.jpg"]
    const [index, setIndex] = useState(0)
    const [image, setImage] = useState(images[0])
    
    const handlePrevious = () => {
        const nextIndex = index > 0 ? index - 1 : images.length - 1
        setImage(images[nextIndex])
        setIndex(nextIndex)
    }
    const handleNext = () => {
        const nextIndex = index < images.length -1 ? index + 1 : 0
        setImage(images[nextIndex]);
        setIndex(nextIndex);        
    };

    return (
        <div className={styles.homeCont}>
            <Navbar/>
            <div className={styles.carouselCont}>
            <button className={styles.button} onClick={handlePrevious}>prev</button>
            <div className={styles.imageCont}>
                <img
                className={styles.image}
                src={require(`../../assets/images/${image}`).default}
                alt="image"
                />
            </div>
            <button className={styles.button} onClick={handleNext}>next</button>
            </div>
      </div>
    );
}
export default Home