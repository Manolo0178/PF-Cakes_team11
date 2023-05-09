import React from "react"
import styles from "./Navbar.module.css"



import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <div>
                <SearchBar />
                <img src="" alt="" />
                <div>
                    <Link>Crear Usiario</Link>
                    <Link>Iniciar Sesion</Link>
                    <Link><img src="" alt="" /></Link>
                </div>
            </div>
            <div>
                <ul>
                    <Link>Inicio</Link>
                    <Link>Conocenos</Link>
                    <Link>Productos</Link>
                    <Link>Sacar Presupuestos</Link>
                    <Link>Contactanos</Link>
                </ul>
            </div>
        </nav>
    )
}
export default Navbar