import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../../redux/actions/index";
import style from "./SearchBar.module.css";

import { FcSearch } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [isListVisible, setListVisible] = useState(false); // Variable de estado para mostrar/ocultar el listado
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allProducts = useSelector((state) => state.allProducts);

  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  function onSubmit(el) {
    el.preventDefault();
    if (search.length === 0) return alert("Debes ingresar un producto");
    if (window.location.pathname !== "/Products") {
      navigate("/Products");
      setTimeout(() => {
        dispatch(searchProducts(search));
      }, 100);
    }
    if (window.location.pathname === "/Products") {
      dispatch(searchProducts(search));
    }
    setSearch("");
  }

  function onInputChange(el) {
    el.preventDefault();
    setSearch(el.target.value);
  }

  function handleDoubleClick() {
    setListVisible(true);
  }

  function handleBlur() {
    setListVisible(false);
  }

  return (
    <div className={style.searchbar}>
      <form className={style.searchbar__form} onSubmit={onSubmit}>
        <input
          className={`${style.searchbar__input} ${style["searchbar__input--custom"]}`}
          type="text"
          placeholder="Ingresa un producto"
          onChange={onInputChange}
          value={search}
          onDoubleClick={handleDoubleClick} // Manejador de evento para habilitar el listado al hacer doble clic
          onBlur={handleBlur} // Manejador de evento para ocultar el listado al perder el foco
          list={isListVisible ? "productSuggestions" : undefined} // Mostrar el atributo 'list' solo cuando el listado debe ser visible
        />
        <datalist id="productSuggestions">
          {filteredProducts.map((product) => (
            <option key={product.id} value={product.name} />
          ))}
        </datalist>
        <button className={style.submit} type="submit">
          <FcSearch size="2.3rem" />
        </button>
      </form>
    </div>
  );
}