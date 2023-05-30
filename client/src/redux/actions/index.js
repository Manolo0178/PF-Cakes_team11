import axios from "axios"



// const storedToken = localStorage.getItem("token");
// const id = localStorage.getItem("userId");


 
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

export const FILTER_PRODUCTS = "FILTER_PRODUCTS";
/********************************** */
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const INCREASE_QUANTITY = "INCREASE_QUANTITY";
export const DECREASE_QUANTITY  = "DECREASE_QUANTITY ";
export const EMPTY_CART = "EMPTY_CART";
/************************************************ */

export const CREATE_USER = "CREATE_USER";

export const GET_ALL_REVIEWS = "GET_ALL_REVIEWS";


//******** Profile ***********/
export const GET_USER_DATA = "GET_USER_DATA";
export const GET_USER_ADDRESS = "GET_USER_ADDRESS";
export const GET_USER_SHOP = "GET_USER_SHOP";



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




export function getDessert(){
    return (dispatch) => {
      axios.get("http://localhost:3001/desserts")
        .then((response) => { dispatch({ type: GET_DESSERT, payload: response.data }) })
        
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

export const filterProducts = (filter) => {
  return {
    type: FILTER_PRODUCTS,
    payload: filter,
  };
}

//Agregar productos al carrito
export const addToCart = (product) => {
  return (dispatch) => {
    dispatch({
      type: ADD_TO_CART,
      payload: product,
    });
  
  };
};

//Eliminar productos del carrito
export const removeFromCart = (itemId) => {
  return {
    type: REMOVE_FROM_CART,
    payload: itemId,
  };
};
export const increaseQuantity = (itemId) => {
  return {
    type: INCREASE_QUANTITY,
    payload: {
      itemId: itemId,
    },
  };
};


export const decreaseQuantity = (itemId) => {
  return {
    type: DECREASE_QUANTITY,
    payload: {
      itemId: itemId,
    },
  };
};
// export const postUser = (form) => {
//   return async (dispatch) => {
//     let response = await axios.post("http://localhost:3001/user/create", form);
//     let formData = await response.data;
//     if (formData.length > 0) {
//       dispatch({
//         type: CREATE_USER,
//         payload: formData,
//       });
//     }
//   }
// }


//******** Get all reviews **********/
export function getAllReviews() {
  return async (dispatch) => {
    await axios.get("http://localhost:3001/review").then((response) => {
      if (response) {
        dispatch({
          type: GET_ALL_REVIEWS,
          payload: response.data,
        });
      }
    });
  };
}

export const emptyCart = () => {
  return {
    type: EMPTY_CART
  };
};

//*********** Get User Data **************/
export function getUserData(token, id) {
  return async (dispatch) => {
    if (token && id) {
      await axios.get(`http://localhost:3001/user/${id}`)
        .then((response) => {
          dispatch({
            type: GET_USER_DATA,
            payload: response.data,
          });
      })
      
    }
  }
}
export function getUserAdress(storedToken, id) {
         return async (dispatch) => {
           if (storedToken) {
             await axios
               .get(`http://localhost:3001/Address/${id}`)
               .then((response) => {
                 dispatch({
                   type: GET_USER_ADDRESS,
                   payload: response.data.addresses,
                 });
               });
           }
         };
       }
