import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Domicilio = () => {
  const userId = localStorage.getItem("userId");
    
  const Navigate = useNavigate()
  
  const [form, setForm] = useState({
    street: "",
    postalCode: "",
    province: "",
    city: "",
    telephoneContact: "",
    number: "",
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [property]: value })
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post(`http://localhost:3001/Address/${userId}`, form)
    Navigate("/profile");
  };

  return (
    <div>
      <section>
        <h2>Agregar Domicilio</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label htmlFor="">Calle: </label>
              <input
                type="text"
                name="street"
                placeholder="Calle"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="">número: </label>
              <input
                type="text"
                name="number"
                placeholder="número"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="">Código postal: </label>
              <input
                type="text"
                name="postalCode"
                placeholder="código postal"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="">Provincia: </label>
              <input
                type="text"
                name="province"
                placeholder="Provincia"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="">Ciudad: </label>
              <input
                type="text"
                name="city"
                placeholder="Ciudad"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="">Telefono de contacto: </label>
              <input
                type="text"
                name="telephoneContact"
                placeholder="Telefono de contacto"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="">Localidad: </label>
              <input
                type="text"
                name="location"
                placeholder="localidad"
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <button type="submit">Agregar domicilio</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Domicilio;
