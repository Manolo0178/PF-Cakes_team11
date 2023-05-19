import React from 'react';
import NavBar from "../../components/Navbar/Navbar"
import CreadorasOhana from "../../assets/images/CreadorasOhana.png"
import Footer from '../../components/Footer/Footer';
import styles from "./about.module.css"

function About(){
    return (
        <div>
            <NavBar />

            <img src={CreadorasOhana} height="600px" alt='aylen'></img>

            <h4>Hola! Soy aylen y junto con mi madre creamos Ohana Pasteleria. 
            Luego de pasar por varias carreras decidi entrar en "Gastronomia y alta cocina", siempre me apasiono la cocina, pero tengo que decir que me gusta mucho mas la pasteleria. Asi que al recibirme nos pusimos manos a la obra junto a mi mamá (es medica), y decidimos poner un emprendimiento. No sabiamos como llamarlo, y como soy fanatica de disney le pusimos "Ohana" que en Hawaiano significa "Familia", el nombre le iba perfecto porque es un emprendimiento familiar.

            <h4>Al principio nuestras tartas, cupcakes y tortas(sobre todo jaja) no eran muy lindas, pero como con practica y pasion todo se puede, mejoramos muchisimo. 
            Nuestros primeros clientes que la mayoria eran amigos, nos empezaron a recomendar y asi fue creciendo nuestro pequeño emprendimiento. Y asi ahora hacemos desde mini cakes, hasta mesas dulces en los cumpleaños.
            Estamos super alegres de lo que logramos, con algo que nos apasiona tanto como es la pasteleria. Siempre estamos buscando que innovacion o reversion de postres podemos hacer, siempre con materia prima de primera, para poder brindar algo nuevo a los clientes.</h4>

            <h4>Te invitamos a descubrir todos los exquisitos sabores que hay en esta tienda online, saludos y gracias.</h4>
            
            </h4>
            <Footer/>
        </div>
    )
        
    
}

export default About