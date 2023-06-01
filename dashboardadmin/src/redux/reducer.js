import {ALL_USER, SORT_USER, SEARCH_NAME, ERRO_NAME, SORT_CART, CART_PRODUCTS, REVIEWS_PRODUCT, DELETE_REVIEW, SHOPS_CART}  from "./actions.js"
const initialStore = {
  userData: [],
  sortOrderedAll: [],
  nameError: null,
  //product
  cartProduct: [],
  sorteredCart: [],
  // cartDelete: []
  reviewsUser: [],
  deleteComment: [],
  shopsItem: []
}

let reducer = (state = initialStore, action) => {
  switch(action.type) {
    case ALL_USER:
    //  const user = action.payload
    //  console.log(user);
      return {
      ...state,
      userData: action.payload,
      sortOrderedAll: action.payload

    }
    case  SORT_USER:
      const userData = [...state.sortOrderedAll];
      const userSorted =  action.payload === "ASC" ? userData.sort((a, b) => {
        return a.name.toUpperCase() < b.name.toUpperCase() ? -1
      : a.name.toUpperCase() > b.name.toUpperCase() ? 1
      : 0 }) :
        action.payload === "DESC" ? userData.sort((a, b) => {
        return a.name.toUpperCase() > b.name.toUpperCase() ? -1
      : a.name.toUpperCase() < b.name.toUpperCase() ? 1 
      : 0 })  : action.payload === "date" ? userData.sort((a, b) => {
        return a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 
      : 0 }) : userData
      
      
       return {
      ...state,
      userData: userSorted
      }
      case SEARCH_NAME:
        return {
          ...state,
          userData: state.sortOrderedAll
        }
      case ERRO_NAME:
        return {
          ...state,
          nameError: action.payload
        }
      case CART_PRODUCTS:
        return {
          ...state,
          cartProduct: action.payload,
          sorteredCart: action.payload
        }
      case SORT_CART:
        const cartAll = [...state.sorteredCart]
        const sortBy = cartAll.map((cart) => {
          if (action.payload === "ASC") {
            return cart.products.sort((a, b) =>
              a.name.toLowerCase() < b.name.toLowerCase() ? -1 : a.name.toLowerCase() > b.name.toLowerCase() ? 1 : 0
            );
          } else if (action.payload === "DESC") {
            return cart.products.sort((a, b) =>
              a.name.toLowerCase() > b.name.toLowerCase() ? -1 : a.name.toLowerCase() < b.name.toLowerCase() ? 1 : 0
            );
          } else {
            return cart; // Devuelve todo el objeto cart si action.payload no es ni "ASC" ni "DESC"
          }
        });
        return {
          ...state,
          cartProduct: sortBy 
        }
      case REVIEWS_PRODUCT:
        return {
          ...state,
          reviewsUser: action.payload,
          // deleteComment: action.payload
        }
      case DELETE_REVIEW:
        // const dele =  [...state.deleteComment];
        // const updatedReviews = dele.filter((review) => review.id !== action.payload);
      
        return {
          ...state,
          deleteComment: state.deleteComment.filter(review => review.id !== action.payload.idReview)
          
        }
      case SHOPS_CART:
        return {
          ...state,
          shopsItem: action.payload
        }  
    default: {
      return state
    }
  }
}



export default reducer