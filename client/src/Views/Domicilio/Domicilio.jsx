import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Domicilio = () => {
    const userId = localStorage.getItem("userId");
    
    const Navigate = useNavigate()
  const [form, setForm] = useState({
    shippingAddress: "",
    postalCode: "",
    city: "",
    location: "",
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [property]: value });
  };

  const handleSubmit = async () => {
    if (form.shippingAddress && form.postalCode && form.city && form.location) {
        await axios.put(`http://localhost:3001/Address/${userId}`, form);
        ResetForm()
        Navigate("/home")
    }
    };
    const ResetForm = () => {
        setForm({
          shippingAddress: "",
          postalCode: "",
          city: "",
          location: ""
        });
    }

  return (
    <div>
      <section>
        <h2>Agregar Domicilio</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label htmlFor="">Dirección de envío: </label>
              <input
                type="text"
                name="shippingAdress"
                placeholder="dirección"
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
              <label htmlFor="">Ciudad: </label>
              <input
                type="text"
                name="city"
                placeholder="ciudad"
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
