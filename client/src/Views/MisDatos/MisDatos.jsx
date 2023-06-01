import React, { useEffect, useState } from 'react';
import NavBar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import style from './MisDatos.module.css';
import { useDispatch, useSelector } from 'react-redux';
import MiPerfilNav from '../miPerfil/MiPerfilNav/MiPerfilNav';
import { getUserData } from '../../redux/actions/index';

const MisDatos = () => {
  const id = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const perfil = useSelector((state) => state.userData);
  const [name, setName] = useState(perfil.name);
  const [lastName, setLastName] = useState(perfil.lastName);
  const [email, setEmail] = useState(perfil.email);
  const [contact, setContact] = useState(perfil.contact);
  const [isModified, setIsModified] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!Object.keys(perfil).length) {
      dispatch(getUserData(token, id));
    }
  }, [dispatch]);

  const handleNameChange = (e) => {
    setName(e.target.value);
    setIsModified(true);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    setIsModified(true);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsModified(true);
  };

  const handleContactChange = (e) => {
    setContact(e.target.value);
    setIsModified(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:3001/user/modifyUser/${id}`;
    const updatedPerfil = { ...perfil, name, lastName, email, contact };
    await axios.put(url, updatedPerfil);
    setIsModified(false);
    setIsEditing(false);
    window.location.reload(true);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleFormClose = () => {
    setIsEditing(false);
  };

  if (Object.keys(perfil).length === 0) {
    return (
      <div className={style.cont}>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <section className={style.sectionCont}>
        <MiPerfilNav />
        <section className={style.section}>
          <h1 className={style.text}>Mis Datos</h1>
          <div className={`${style.card} ${isEditing ? style.editing : ''}`}>
            <div className={style.form}>
              <div className={style.field}>
                <span>Nombre:</span>
                {isEditing ? (
                  <input className={style.inputEdit} type="text" id="name" value={name} onChange={handleNameChange} />
                ) : (
                  <div className={style.valorActual}>{perfil.name}</div>
                )}
              </div>
              <div className={style.field}>
                <span>Apellido:</span>
                {isEditing ? (
                  <input className={style.inputEdit} type="text" id="lastName" value={lastName} onChange={handleLastNameChange} />
                ) : (
                  <div className={style.valorActual}>{perfil.lastName}</div>
                )}
              </div>
              <div className={style.field}>
                <span>Email:</span>
                {isEditing ? (
                  <input className={style.inputEdit} type="text" id="email" value={email} onChange={handleEmailChange} />
                ) : (
                  <div className={style.valorActual}>{perfil.email}</div>
                )}
              </div>
              <div className={style.field}>
                <span>Número de contacto:</span>
                {isEditing ? (
                  <input className={style.inputEdit} type="text" id="contact" value={contact} onChange={handleContactChange} />
                ) : (
                  <div className={style.valorActual}>{perfil.contact}</div>
                )}
              </div>
              { 
              perfil.googleId ? <span></span> :
              <div className={style.field}>
                <h6>Contraseña:</h6>               
                <Link to={'/profile/newPassword'}>
                  <div className={style.boton}>
                    <button>Cambiar Contraseña</button>
                  </div>
                </Link>      
              </div>
              }
              {isModified && <p>¡Cambios guardados con éxito!</p>}
              {isEditing ? (
                <div className={style.boton}>
                  <button onClick={handleSubmit}>Guardar</button>
                  <button onClick={handleFormClose}>Cerrar formulario</button>
                </div>
              ) : (
                <div className={style.boton}>
                  <button onClick={handleEditClick}>Editar datos</button>
                </div>
              )}
            </div>
          </div>
        </section>
      </section>
      <Footer />
    </div>
  );
};

export default MisDatos;
