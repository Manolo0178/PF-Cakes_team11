import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import NavBar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import Favorite from "../../components/Favorite/Favorite";

import {DndContext, closestCenter} from "@dnd-kit/core"
import {SortableContext, verticalListSortingStrategy, arrayMove} from "@dnd-kit/sortable"






const Favorites = ({ setPage }) => {
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
      <NavBar/>
      {/* <h1>Favoritos</h1>
      <div>
        {fav?.map((favorite) => (
          <Card product={favorite} key={favorite.id} setPage={setPage} />
          ))}
      </div> */}
      <DndContext 
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <h1>Favoritos</h1>
        <SortableContext items={fav} strategy={verticalListSortingStrategy}>
          {fav.map((favorite) => (
          <Favorite favorite={favorite} key={favorite.id} />
          ))}
        </SortableContext>

      </DndContext>

      <Footer/>

    </section>
  );
};

export default Favorites;
