import axios from "axios"




//********** Actions Types **********/
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";

export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";
export const GET_DETAILS = "GET_DETAILS";
export const LIMPIAR_DETAILS = "LIMPIAR_DETAILS";
export const SEARCH_PRODUCTS = "SEARCH_PRODUCTS";
export const ORDER_PRODUCTS = "ORDER_PRODUCTS";
export const GET_DESSERT = "GET_DESSERT";
/************************************ */
export const CREATE_DESERT = "CREATE_DESERT";
export const FORM_ERROR = "FORM_ERROR"





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

//********Search products ********/
export function searchProducts(search){
  return async function (dispatch)
{
  try{
    var json = await axios.get("http://localhost:3001/products?name=" + search);
    return dispatch({
      type: SEARCH_PRODUCTS,
      payload: json.data
    })
  } catch (error){
    alert("Postre no encontrado");
  }
}}


//********Order products ********/

export function orderProducts(value){
  return{
    type: ORDER_PRODUCTS, payload: value
  }

}


// export function postDessert(payload){
//   return async function (dispatch){
//       const response = await axios.post("http://localhost:3001/products",payload)
//       return response;
//   }
// }

export function getDessert(){
    return (dispatch) => {
      axios.get("http://localhost:3001/desserts")
      .then((response) => {dispatch({type: GET_DESSERT, payload: response.data})})
    }

}


export function changeDetails(payload,id) {
  return async function () {
    console.log(payload)
    return await axios.put(`http://localhost:3001/products/${id}`, payload);
  }
}

export const postDessert = (form) => {
  return async (dispatch) => {
    try {
      let response = await axios.post("http://localhost:3001/products", form);
      let formData = await response.data;
      if (formData.length > 0) {
        dispatch({
          type: CREATE_DESERT,
          payload: formData,
        });
      } else {
        dispatch({
          type: FORM_ERROR,
          payload: "Postre creado",
        });
      }
    } catch (error) {
      dispatch({
        type: FORM_ERROR,
        payload: "Postre no creado",
      });
      console.log(error);
    }
  };
};