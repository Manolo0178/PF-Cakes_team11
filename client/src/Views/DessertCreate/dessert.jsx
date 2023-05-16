import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { postDessert, getDessert } from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/Navbar/Navbar";
import style from "./dessert.module.css";
import Footer from "../../components/Footer/Footer"
import validation from "./Validation";
export default function CreateDessert() {
  const dispatch = useDispatch();

  const desserts = useSelector((state) => state.dessert);
  const errorForm = useSelector((state) => state.errorForm);
 
  const [form, setForm] = useState({
    name: "",
    summary: "",
    description: "",
    image: "",
    price: "",
    desserts: [],
  });
  
  const [errors, setErrors] = useState({
    name: "",
    summary: "",
    description: "",
    image: "",
    price: "",
    desserts: [],
  });

  function handleChange(event) {
    const property = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [property]: value });
    setErrors(validation({...form,[property]:value},errors))
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
    if (form.desserts.length < 2) {
      setForm({
        ...form,
        desserts: [...form.desserts, selectedDessert],
      });
      e.target.value = "";
    }
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
