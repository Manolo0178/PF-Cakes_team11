import React, { useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {postDessert, getDessert} from '../../redux/actions/index';
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/Navbar/Navbar";
import style from "./dessert.module.css";

function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = 'Se requiere un nombre para el postre';
    }else if (!input.summary){
        errors.summary = 'Se requiere completar el summary';
    }else if (!input.description){
        errors.description = 'Se requiere completar la descripcion';
    }else if (!input.Dessert){
        errors.Dessert = 'Se requiere conocer el postre';
    }
    else if (!input.image){
        errors.image = 'Se requiere que la imagen sea PNG';
    } 
     return errors;
}

export default function CreateDessert(){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const dessert = useSelector((state) => state.dessert)
    
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState ({
        name: "",
        summary: "",
        description: "",
        image: "",
        price: "",
        dessert:[]
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }));

    }

    function handleDelete(el){
        setInput({
            ...input,
            dessert: input.dessert.filter(occ => occ !== el)
        })
    }


    useEffect(() => {
        dispatch(getDessert());
    }, []);


    function handleSelect(e){
        setInput({
            ...input,
            dessert: [...input.dessert,e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        if(input.name === '' || input.summary === '' || input.description === '' ||  input.image === '') return alert('Pibe completame los campos porfa');
        dispatch(postDessert(input))
        alert("POSTRE CREADO!!")
        setInput({
            name: "",
            summary: "",
            description: "",
            image: "",
            price:"",
            Dessert:[]
        })
        navigate("/Products")
    }
    return(
        <div className={style.cont}>
            <NavBar/>
            <h1>Crea tu postre!</h1>
            <form onSubmit={(e) => handleSubmit(e)} className="form">

                <div>
                    <label className="label">Nombre:</label>
                    <input 
                    type="text"
                    value={input.name}
                    name="name"
                    onChange={handleChange}
                    />
                    {errors.name && (
                        <p className='error'>{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>Summary:</label>
                    <input 
                    type="text"
                    value={input.summary}
                    name="summary"
                    onChange={handleChange}
                    />
                     {errors.summary && (
                        <p className='error'>{errors.summary}</p>
                    )}
                </div>
                <div>
                    <label>Descripcion:</label>
                    <input 
                    type="text"
                    value={input.description}
                    name="description"
                    onChange={handleChange}
                    />
                     {errors.description && (
                        <p className='error'>{errors.description}</p>
                    )}
                </div>
                <div>
                    <label>Price:</label>
                    <input 
                    type="number"
                    value={input.price}
                    name="price"
                    onChange={handleChange}
                    />
                     {errors.price && (
                        <p className='error'>{errors.price}</p>
                    )}
                </div>
                <div>
                    <label>Imagen PNG:</label>
                    <input 
                    type="text"
                    value={input.image}
                    name="image"
                    onChange={handleChange}
                    />
                     {errors.image && (
                        <p className='error'>{errors.image}</p>
                    )}
                </div>
                
            <label>Dessert :</label>
              <select onChange={(e) => handleSelect(e)}>
                {
                    dessert?.map((el) => (
                        <option value={el} key={el}>{el}</option>
                    ))
                }
                
              </select>
                <br>
                </br>
                <p/>
              <ul><li>{input.dessert?.map(el => el + " , ")}</li></ul>
              <button type='submit' className="button">Crear Postre</button>
            </form>
            {
                
                input.dessert?.map(el => 
                    <div className="divOcc">
                    <p className="divOcc">{el}</p>
                    <button className=" botonX" onClick={() => handleDelete(el)}>X</button>
                    </div>
                )
            }
        </div>
    )

}