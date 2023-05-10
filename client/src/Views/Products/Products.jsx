import React from "react";
import Cards from "../../components/Cards/cards";
import Navbar from "../../components/Navbar/Navbar";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getAllProducts } from "../../redux/actions/index";

function Products() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.allProducts);

    useEffect(() => {
      dispatch(getAllProducts());
    }, []);
    
  return (
      <div>
        <Navbar/>
          <h1>Productos</h1>
          <div>
              <div>
                  <h5>Categorias</h5>
              </div>  
            <Cards products={products} />
          </div>
      </div>
  );
}
export default Products;
