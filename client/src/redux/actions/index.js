import axios from "axios"




//********** Actions Types **********/
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const GET_PRODUCT_BY_NAME = "GET_PRODUCT_BY_NAME";
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";
export const GET_DETAILS = "GET_DETAILS";


//******** Get all products **********/
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


//******** Get products by name **********/
export function getProductsByName(name) {
  return (dispatch) => {
    axios
      .get(`http://localhost:3001/products?name=${name}`)
      .then((response) => {
        dispatch({
          type: GET_PRODUCT_BY_NAME,
          payload: response.data,
        });
      });
  };
}


//******** Get products by id **********/
export function getProductsById(id) {
  return (dispatch) => {
    axios.get(`http://localhost:3001/products/${id}`).then((response) => {
      dispatch({
        type: GET_PRODUCT_BY_ID,
        payload: response.data,
      });
    });
  };
}

export function getDetail(id){
  return async function (dispatch){
      try{
          const json = await axios.get(`http://localhost:3001/products/${id}`);
          return dispatch({
              type: GET_DETAILS,
              payload: json.data
          })
      }catch(error){
          console.log(error)
      }
  }
}
