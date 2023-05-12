import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from "../../components/Navbar/Navbar"
import CreadorasOhana from "../../assets/images/CreadorasOhana.png"


function About(){
    return (
        <div>
            <Navbar />

            <h2>Nos presentamos: </h2>

            <img src={CreadorasOhana} height="600px"></img>
            <h4>Mi madre y yo siempre hemos tenido una pasión por la cocina y la pastelería. Cuando terminé mi carrera de chef, decidimos crear nuestra propia pastelería desde cero. Comenzamos con muy poco dinero, pero con nuestras habilidades culinarias y nuestro entusiasmo por el negocio, compramos los ingredientes necesarios para nuestras primeras creaciones.

            Preparamos los pasteles, los cupcakes, las galletas y los macarons más deliciosos que jamás habíamos hecho y los presentamos en una pequeña mesa en la entrada de nuestra casa. Los primeros clientes que llegaron fueron amigos y familiares, pero pronto comenzamos a recibir pedidos de personas que habían probado nuestras deliciosas creaciones.

            Nuestra pastelería se hizo famosa en la ciudad y, con el tiempo, la pequeña mesa se convirtió en un mostrador, el mostrador en una tienda y la tienda en una franquicia de pastelerías. Trabajamos arduamente para mantener la calidad y el sabor de nuestras creaciones, y nuestro negocio siguió creciendo año tras año.

            Aunque tuvimos momentos difíciles, nunca perdimos el entusiasmo y la pasión por nuestro negocio, y asi nacio OHANA PASTELERIA. </h4>
        </div>
    )
        
    
}

export default About