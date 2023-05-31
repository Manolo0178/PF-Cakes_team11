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
export const INCREASE_QUANTITY_SUCCESS = "INCREASE_QUANTITY_SUCCESS";
export const DECREASE_QUANTITY  = "DECREASE_QUANTITY ";
export const EMPTY_CART_SUCCESS = "EMPTY_CART_SUCCESS";
export const GET_CART = "GET_CART";
export const ADD_TO_CART_SUCCESS = "ADD_TO_CART_SUCCESS";
/************************************************ */

export const CREATE_USER = "CREATE_USER";

export const GET_ALL_REVIEWS = "GET_ALL_REVIEWS";


//******** Profile ***********/
export const GET_USER_DATA = "GET_USER_DATA";
export const GET_USER_ADDRESS = "GET_USER_ADDRESS";
export const GET_USER_SHOP = "GET_USER_SHOP";
export const POST_SHOP = "POST_SHOP";



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
export const addToCart = (id, userId) => {
  return async (dispatch) => {
      const response = await axios.post(
        `http://localhost:3001/carts/${userId}/${id}`
      );
      dispatch({ type: ADD_TO_CART_SUCCESS});
  };
};

export function getCart(userId) {
         return async (dispatch) => {
           await axios
             .get(`http://localhost:3001/carts/${userId}`)
             .then((response) => {
               if (response.data) {
                 dispatch({
                   type: GET_CART,
                   payload: response.data.products,
                 });
               }
             });
         };
       }

//Eliminar productos del carrito
// export const removeFromCart = async(itemId,userId) => {
//   await axios.delete(`http://localhost:3001/carts/${userId}/${itemId}`)
//   return await getCart(userId);
  
// };
export const removeFromCart = (id, userId) => {
  return (dispatch) => {
    return axios.delete(`http://localhost:3001/carts/${userId}/${id}`)
      .then(() => {
        dispatch({ type: REMOVE_FROM_CART });
      })
      .catch((error) => {
        // Manejo de errores
      });
  };
};


export const increaseQuantity = (itemId, userId, quantity) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/carts/${userId}/${itemId}`,
        { quantity: quantity }
      );
      console.log(response);
      dispatch({ type: "INCREASE_QUANTITY_SUCCESS" });
    } catch (error) {
      console.error(error);
      dispatch({ type: "INCREASE_QUANTITY_FAILURE", error: error.message });
    }
  };
};



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

export const emptyCart = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/carts/reset/${userId}/user`
      );
      // Despachar acción después de la eliminación exitosa del carrito
      dispatch({ type: "EMPTY_CART_SUCCESS" });
    } catch (error) {
      console.error(error);
      // Despachar acción en caso de error
      dispatch({ type: "EMPTY_CART_FAILURE", error: error.message });
    }
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



//************ Get Shops *************/

export function getShops(idUser) {
         return async (dispatch) => {
           await axios
             .get(`http://localhost:3001/shops/${idUser}`)
             .then((response) => {
               dispatch({
                 type: GET_USER_SHOP,
                 payload: response.data,
               });
             });
         };
       }
export const postShop = (id, userId, cantidad, price) => {
  return async (dispatch) => {
    const total = price * cantidad
    const response = await axios.post(
      `http://localhost:3001/shops/${userId}/${id}/${cantidad}/${total}`
    );
    dispatch({ type: POST_SHOP });
  };
};
