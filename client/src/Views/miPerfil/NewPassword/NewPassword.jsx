import React, { useEffect } from "react";
import styles from './NewPassword.module.css'
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const NewPassword = () => {
    const id = localStorage.getItem("userId")
    const navigate = useNavigate()

    const [password, setPassword] = useState({
        password: '',
        newPassword: '',
        confirmNueva: '',
    });
    

    const [error, setError] = useState({
        password: '',
        newPassword: '',
        confirmNueva: '',
    });
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        setError(validation(password));
    }, [password]);

    const validation = (form) => {
        const statError = {};

        if (!form.newPassword) {
            statError.newPassword = "";
        } else if(!/^(?=.*[A-Z]).+$/.test(form.newPassword)){
            statError.newPassword = "Debe contener 1 letra mayuscula";
        } else if (!/.*[0-9].*/.test(form.newPassword)) {
            statError.newPassword = "Debe contener números";
        } else if (form.newPassword.length < 6 || form.newPassword.length > 20) {
            statError.newPassword = "Debe tener entre 6 y 20 caracteres";
            
        }else {
            statError.newPassword = "";
        }
        
        if (!form.confirmNueva) {
            statError.confirmNueva = "";
        } else if (form.confirmNueva !== form.newPassword) {
            statError.confirmNueva = "No coincide con la contraseña";
        } else {
            statError.confirmNueva = "";
        }
        
        if (form.password && form.newPassword && form.confirmNueva && !Object.values(statError).some((error) => error !== "")) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
        
        return statError;
    }
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        
        setPassword({ ...password, [name]: value });
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/user/modifyPassword/${id}`, password)
                
                Swal.fire({
                    title: "Contraseña actualizada correctamente",
                    icon: "success",
                    confirmButtonText: "Ok",
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        navigate('/profile')
                    }
                })
            } catch (error) {
                Swal.fire({
                    title: error.response.data,
                    icon: "error",
                    confirmButtonText: "Ok",
                })
                resetForm();
            }
            
        };
        const resetForm = () => {
            setPassword({
                password: '',
                newPassword: '',
                confirmNueva: '',
            });
        };
        
    return (
        <div style={{ backgroundColor: 'bagraun', width: '100vw', height: '100vh' }}>
            <form className={styles.container} onSubmit={handleSubmit} >
                <h3>Cambiar Contraseña</h3>
                <div className={styles.newP}>
                    <label htmlFor="contraseña actual"> Contraseña actual: </label>
                    <input
                        type="password"
                        placeholder="..."
                        name="password"
                        onChange={handleChange}
                        value={password.password}
                    />
                </div>
                <div className={styles.cont} >
                    <label htmlFor="contraseña nueva"> Contraseña nueva: </label>
                    <input
                        type="password"
                        placeholder="..."
                        name="newPassword"
                        onChange={handleChange}
                        value={password.newPassword}
                        />
                </div>
                <div className={styles.error} >
                        {error.newPassword && error.newPassword !== "" && (
                            <span>{error.newPassword}</span>
                        )}
                </div>
                <div className={styles.fir} >
                    <label htmlFor="confirmar contraseña"> Confirmar contraseña: </label>
                    <input
                        type="password"
                        placeholder="..."
                        name="confirmNueva"
                        onChange={handleChange}
                        value={password.confirmNueva}
                        />
                </div>
                <div className={styles.error1} >
                        {error.confirmNueva && error.confirmNueva !== "" && (
                            <span className={styles.error}>{error.confirmNueva}</span>
                            )}
                </div>
                <button type="submit" disabled={!formValid}>Enviar</button>
            </form>
            <Link to={'/profile'} style={{ all: 'unset' }}>
                <div className={styles.atras} >
            ⇦ 
                </div>
            </Link>
        </div>
    )
}

export default NewPassword;