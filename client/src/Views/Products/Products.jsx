import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";


import NavBar from "../../components/Navbar/Navbar"
import Cards from "../../components/Cards/cards";

import { getAllProducts } from "../../redux/actions";

function Products() {
    const dispatch = useDispatch()
    const products = useSelector(state => state.allProducts)

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch])
    
    console.log(products)

    return (
        <div>
            <NavBar />
            <div>
                <h1>Products</h1>
                <section>
                    <div>
                        <h5>Categorías</h5>
                    </div>
                    <Cards products={products} />
                </section>
            </div>
        </div>
    )
}
export default Products