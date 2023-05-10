import axios from "axios"




//********** Actions Types **********/
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const SEARCH_PRODUCTS = "SEARCH_PRODUCTS";


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

export function searchProducts(search){
  return async function (dispatch)
{
  try{
    var json = await axios.get("http://localhost:3001/products" + search);
    return dispatch({
      type: SEARCH_PRODUCTS,
      payload: json.data
    })
  } catch (error){
    console.log(error);
  }
}}