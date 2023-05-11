import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import { searchProducts } from '../../redux/actions/index';

export default function SearchBar(){
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    function onSubmit(el){
        el.preventDefault();
        if(search.length === 0) return alert ('Debes ingresar un producto');
        dispatch(searchProducts(search))
        setSearch('')
    }

    function onInputChange(el){
        el.preventDefault();
        setSearch(el.target.value)
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type='text' placeholder='Ingresa un producto' onchange={onInputChange} value={search}/>
                <input type='submit' value = 'Buscar' />
            </form>
        </div>
    )

}