import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { postDessert, getDessert } from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/Navbar/Navbar";
import style from "./dessert.module.css";
import Footer from "../../components/Footer/Footer"
export default function CreateDessert() {
  const dispatch = useDispatch();
  //   const navigate = useNavigate();

  const desserts = useSelector((state) => state.dessert);
  const errorForm = useSelector((state) => state.errorForm);
  const [errors, setErrors] = useState({
    name: "",
    summary: "",
    description: "",
    image: "",
    price: "",
    desserts: [],
  });

  const [form, setForm] = useState({
    name: "",
    summary: "",
    description: "",
    image: "",
    price: "",
    desserts: [],
  });

  function validate() {
    let newErrors = {};
    if (!form.name) {
      newErrors.name = "Se requiere un nombre para el postre";
    } else if (!/^[a-zA-Z ]+$/.test(form.name)) {
      newErrors.name = "No se permiten numeros";
    } else {
      newErrors.name = "";
    }

    if (!form.summary) {
      newErrors.summary = "Se requiere completar el summary";
    } else {
      newErrors.summary = "";
    }

    if (!form.description) {
      newErrors.description = "Se requiere completar la descripcion";
    } else {
      newErrors.description = "";
    }

    // if (!/^https?:\/\/[\da-z.-]+\.[a-z.]{2,6}(\/[\w .-]*)*\/?$/.test(form.image)) {
    //   newErrors.image = "Se requiere una url";
    // } else {
    //   newErrors.image = "";
    // }

    if (!form.desserts) {
      newErrors.desserts = "Se requiere conocer el postre";
    } else {
      newErrors.desserts = "";
    }

    setErrors({ ...errors, ...newErrors });
  }

  function handleChange(e) {
    e.target.name === "dessert"
      ? setForm({
          ...form,
          desserts: [...form.desserts, e.target.value],
        })
      : setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
    validate(e.target.value);
  }

  function handleDelete(value) {
    setForm({
      ...form,
      desserts: form.desserts.filter((occ) => occ !== value),
    });
  }

  useEffect(() => {
    dispatch(getDessert());
  }, [dispatch]);

  function handleSelect(e) {
    const selectedDessert = e.target.value;
    setForm({
      ...form,
      desserts: [...form.desserts, selectedDessert],
    });
    e.target.value = ""; //limpiar el valor seleccionado
  }

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(postDessert(form));

    resetForm();
    // navigate("/Products");
  }

  const resetForm = () => {
    setForm({
      name: "",
      summary: "",
      description: "",
      image: "",
      price: "",
      desserts: [],
    });
  };
  return (
    <div className={style.cont}>
      <NavBar />
      <form
        onSubmit={(e) => handleSubmit(e)}
        className={style.form}
        autoComplete="off"
      >
        <h1>Crea tu postre!</h1>
        <div className={style.textCont}>
          <div className={style.inputCont}>
            <div className={style.input}>
              <label className="label">Nombre:</label>
              <input
                type="text"
                value={form.name}
                name="name"
                onChange={handleChange}
              />
            </div>
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div className={style.inputCont}>
            <div className={style.input}>
            <label>Summary:</label>
            <input
              type="text"
              value={form.summary}
              name="summary"
              onChange={handleChange}
            />
            </div>
            {errors.summary && <p className="error">{errors.summary}</p>}
          </div>
          <div className={style.inputCont}>
            <div className={style.input}>
            <label>Descripcion:</label>
            <input
              type="text"
              value={form.description}
              name="description"
              onChange={handleChange}
              />
            </div>
            {errors.description && (
              <p className="error">{errors.description}</p>
            )}
          </div>
          <div className={style.inputCont}>
            <div className={style.input}>
            <label>Price:</label>
            <input
              type="number"
              value={form.price !== "null" ? form.price : "0"}
              name="price"
              onChange={(e) => handleChange(e)}
              // defaultValue="0"
              />
            </div>
            {errors.price && <p className="error">{errors.price}</p>}
          </div>
          <div className={style.inputCont}>
            <div className={style.input}>
            <label>Imagen PNG:</label>
            <input
              type="text"
              value={form.image}
              name="image"
              onChange={handleChange}
              />
            </div>
            {errors.image && <p className="error">{errors.image}</p>}
          </div>
          <label htmlFor="desserts">
            Dessert:
            <select name="desserts" onChange={handleSelect}>
              <option value="">Seleccionar</option>
              {desserts?.map((dessert, index) => (
                <option value={dessert} key={index}>
                  {dessert}
                </option>
              ))}
            </select>
          </label>

          <br></br>
          <p />
          <h5>{form.desserts?.map((dessert) => dessert + " , ")}</h5>
        </div>
        <button type="submit" className="button">
          Crear Postre
        </button>
        {errorForm !== "" ? <h6>{errorForm}</h6> : ""}
      </form>
      {form.desserts?.map((dessert, index) => (
        <div className="divOcc" key={index}>
          <p className="divOcc">{dessert}</p>
          <button className=" botonX" onClick={() => handleDelete(dessert)}>
            X
          </button>
        </div>
      ))}
      <Footer />
    </div>
  );
}
