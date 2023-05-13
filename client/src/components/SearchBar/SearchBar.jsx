import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchProducts } from "../../redux/actions/index";
import style from "./SearchBar.module.css";

import { FcSearch } from "react-icons/fc";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  function onSubmit(el) {
    el.preventDefault();
    if (search.length === 0) return alert("Debes ingresar un producto");
    dispatch(searchProducts(search));
    setSearch("");
  }

  function onInputChange(el) {
    el.preventDefault();
    setSearch(el.target.value);
  }

  return (
    <div className={style.searchbar}>
      <form className={style.searchbar__form} onSubmit={onSubmit}>
        <input
          className={style.searchbar__input}
          type="text"
          placeholder="Ingresa un producto"
          onChange={onInputChange}
          value={search}
        />
        <button className={style.submit} type="submit"><FcSearch size="2.3rem"/></button>
      </form>
    </div>
  );
}