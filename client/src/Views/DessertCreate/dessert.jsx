import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { postDessert, getDessert } from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/Navbar/Navbar";
import style from "./dessert.module.css";
import Footer from "../../components/Footer/Footer"
import Swal from "sweetalert2";
import { BsFillFileEarmarkArrowUpFill } from "react-icons/bs";
import validation from "./Validation";
export default function CreateDessert() {
  const dispatch = useDispatch();

  const desserts = useSelector((state) => state.dessert);
  const errorForm = useSelector((state) => state.errorForm);
 
  const [form, setForm] = useState({
    name: "",
    summary: "",
    description: "",
    imageFile: null,
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
    const value = event.target.type === "file" ? event.target.files[0] : event.target.value;

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
    if (form.desserts.length < 2 && selectedDessert !== form.desserts) {
      
      setForm({
        ...form,
        desserts: [...form.desserts, selectedDessert],
      });

    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!errors.name && !errors.description && !errors.image &&!errors.price && !errors.desserts) {
      dispatch(postDessert(form));
      Swal.fire({
        title: "Creaste un Postre",
        icon: "success",
        confirmButtonText: "Ok",
      });
      resetForm();
    }
      Swal.fire({
        title: "Completa todos los datos por favor",
        icon: "error",
        showConfirmButton:false,
        timer:1500
      });    
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
          <div className={style.input}>
            <label className="label">Nombre:</label>
            <input
              type="text"
              value={form.name}
              name="name"
              onChange={handleChange}
              placeholder="Nombre"
            />
            {errors.name && <p className={style.error}>{errors.name}</p>}
          </div>

          <div className={style.input}>
            <label>Resumen:</label>
            <input
              type="text"
              value={form.summary}
              name="summary"
              onChange={handleChange}
              placeholder="Summary"
            />
            {errors.summary && <p className={style.error}>{errors.summary}</p>}
          </div>

          <div className={style.input}>
            <label>Descripción:</label>
            <input
              type="text"
              value={form.description}
              name="description"
              onChange={handleChange}
              placeholder="Descripción"
            />
            {errors.description && (
              <p className={style.error}>{errors.description}</p>
            )}
          </div>

          <div className={style.priceCont}>
            <label>Precio:</label>
            <input
              type="number"
              value={form.price !== "null" ? form.price : "0"}
              name="price"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className={style.imageCont}>
            <label>Imágen: </label>
            <div className={style.logoCont}>
              <input
                type="file"
                name=""
                onChange={handleChange}
                accept="image/png"
              />
              <BsFillFileEarmarkArrowUpFill className={style.logoFile} />
            </div>
          </div>

          <div className={style.dessertCont}>
            <div className={style.dessert}>
              <label>Tipo de Postre:</label>
              <select name="desserts" onChange={handleSelect}>
                <option value="" selected disabled hidden>
                  Seleccionar
                </option>
                {desserts?.map((dessert, index) => (
                  <option value={dessert} key={index}>
                    {dessert}
                  </option>
                ))}
              </select>
            </div>
            <div className={style.desCont}>
              {form.desserts?.map((dessert, index) => (
                <div key={index} className={style.des}>
                  <p>{dessert}</p>
                  <button
                    className={style.botonX}
                    onClick={() => handleDelete(dessert)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button type="submit" className={style.button}>
          Crear Postre
        </button>
      </form>

      <Footer />
    </div>
  );
}
