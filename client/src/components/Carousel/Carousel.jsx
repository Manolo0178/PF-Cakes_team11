import Carousel from 'react-bootstrap/Carousel';
import { useState } from "react";

import carousel1 from "../../assets/images/carrousel1.jpg"
import carousel2 from "../../assets/images/carrousel2.jpg"
import carousel3 from "../../assets/images/carrousel3.jpg"
import carousel4 from "../../assets/images/carrousel4.jpg"

import styles from "./Carousel.module.css"

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img className="d-block w-100" src={carousel1} alt="First slide" style={{height: "500px", objectFit:"cover"}}/>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={carousel2} alt="Second slide" style={{height: "500px", objectFit:"cover"}} /> 
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={carousel4} alt="Third slide" style={{height: "500px", objectFit:"cover"}} />
      </Carousel.Item>
    </Carousel>
  );
}

function CarouselSlide() {
    return (
        <div className={styles.carouselCont}>
            <ControlledCarousel/>
        </div>
    )
}

export default CarouselSlide;