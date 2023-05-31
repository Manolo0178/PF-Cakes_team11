//*************POR USUARIO**********************/
export const ALL_USER = "ALL_USER";
export const SORT_USER = "SORT_USER";
export const SEARCH_NAME = "SEARCH_NAME"
export const ERRO_NAME ="ERRO_NAME"
//*************PRODUCTO**********************/
export const CART_PRODUCTS = "CART_PRODUCTS";
export const SORT_CART = "SORT_CART";
//***************CART **********************/
// export const DELETE_CART = "DELETE_CART";
export const REVIEWS_PRODUCT = "REVIEWS_PRODUCT"
export const DELETE_REVIEW = " DELETE_REVIEW"
//************* */
export const allUser = () => {
  return async (dispatch) => {
    try {
      let response = await fetch(`http://localhost:3001/user`)
      let dataUser = await response.json();
      
        // console.log(dataUser);
        dispatch({
          type: ALL_USER,
          payload: dataUser
        })
      
     
    } catch (error) {
      console.log("not found user " + error.message)
    }
  }
}
export const sortUser = (ord) => {
  return {
    type: SORT_USER,
    payload: ord

  }
}
export const searchName = (name) => {
  return async (dispatch) => {
    try {
      let response = await fetch(`http://localhost:3001/user?name=${name}`)
      let dataName = await response.json();
      if(dataName) {
        dispatch({
          type: SEARCH_NAME,
          payload: dataName
        })
        dispatch({
          type: ERRO_NAME,
          payload: "name encontrado"
        })
      } else {
        dispatch({
          type: ERRO_NAME,
          payload: "name no encontrado"
        })
      }
    } catch (error) {
      console.log("not found user " + error.message)
    }
  }
}
//*****************actions carts******** */
export let cartProducts = () => {
  return async(dispatch) => {
    try {
      let response = await fetch(`http://localhost:3001/carts`)
      let cartData = await response.json();
      // console.log(cartData);
      if(cartData) {
        dispatch({
          type: CART_PRODUCTS,
          payload: cartData
        })
      } else {
        dispatch({
          type: CART_PRODUCTS,
          payload: "no encontrado"
        })
      }
    } catch (error) {
      console.log("Product not found " + error.message)
    }
  }
}

export const sortCart = (ord) => {
  return {
    type: SORT_CART,
    payload: ord
  }
}
// // export const deleteCart = (productId) => {
// //   return {
// //     type: DELETE_CART,
// //     payload: productId
// //   }
// // }
// export const deleteCart = (userId, productId) => {
//   return async (dispatch) => {
//     try {
//       await fetch(`/carts/${userId}/${productId}`, { method: 'DELETE' });
//       dispatch({
//         type: DELETE_CART,
//         payload: {
//           userId,
//           productId
//         }
//       });
//     } catch (error) {
//       console.log({message: error.message})
//     }    
//   }
// }
////*************** */

export const reviewsProduct = () => {
  return async(dispatch) => {
    try {
      let response = await fetch(`http://localhost:3001/review`);
    let reviewData = await response.json();
    if(reviewData) {
      dispatch({
        type: REVIEWS_PRODUCT,
        payload: reviewData
      })
    } else {
      dispatch({
        type: REVIEWS_PRODUCT,
        payload: "no reviews"
      })
    }
    } catch (error) {
      console.log({message: error.message})
    }
    
  }
}
// export const deleteReview = (idReview) => {
//   return {
//     type: DELETE_REVIEW,
//     payload: idReview

//   }
// }
export const deleteReview = (idReview, idUser) => {
  return async (dispatch) => {
    try {
      let response = await fetch(`http://localhost:3001/review/${idUser}/${idReview}`)
      let reviewData = await response.json()

      if (reviewData.length > 0) {
        dispatch({
          type: DELETE_REVIEW,
          payload: reviewData,
        });
      } else {
        dispatch({
          type: DELETE_REVIEW,
          payload: "no reviews",
        });
      }
    } catch (error) {
      console.log({ message: error.message });
    }
  };
};

