import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import NavBar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import Favorite from "../../components/Favorite/Favorite";

import {DndContext, closestCenter} from "@dnd-kit/core"
import {SortableContext, verticalListSortingStrategy, arrayMove} from "@dnd-kit/sortable"

import MiPerfilNav from "../miPerfil/MiPerfilNav/MiPerfilNav"

import styles from "./Favorites.module.css"


const Favorites = () => {
  const userId = localStorage.getItem("userId");
  const [fav, setFav] = useState([]);

  useEffect(() => {
    const getFav = async () => {
      await axios
        .get(`http://localhost:3001/favoritos/user/${userId}/products`)
        .then((response) => {
          setFav(response.data);
        });
    };
    getFav();
  }, []);


  const handleDragEnd = (event) =>{
    const {active ,over} = event
    setFav((fav)=>{
      const oldIndex = fav.findIndex(product=> product.id === active.id);
      const newIndex = fav.findIndex(product=> product.id === over.id);
      
      return arrayMove(fav,oldIndex,newIndex);
    })

  } 

  return (
    <section>
      <NavBar />
      <section className={styles.cont}>
        <MiPerfilNav />
        <div className={styles.sectionFav}>
          <h1>Favoritos</h1>
          <div className={styles.favorites}>
            {!fav &&
              <p>No tienes ningun favorito todavía</p>
            }
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={fav}
                strategy={verticalListSortingStrategy}
              >
                {fav.map((favorite) => (
                  <Favorite favorite={favorite} key={favorite.id} />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        </div>
      </section>
      <Footer />
    </section>
  );
};

export default Favorites;
