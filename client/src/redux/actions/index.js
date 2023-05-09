import axios from "axios"




//********** Actions Types **********/
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";


export function getAllProducts() {
  return (dispatch) => {
    axios.get("http://localhost:3001/products").then((response) => {
      dispatch({
        type: GET_ALL_PRODUCTS,
        payload: response.data,
      });
    });
  };
}