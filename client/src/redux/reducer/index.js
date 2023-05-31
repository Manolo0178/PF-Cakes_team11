import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
  LIMPIAR_DETAILS,
  SEARCH_PRODUCTS,
  ORDER_PRODUCTS,
  GET_DESSERT,
  CREATE_DESERT,
  FORM_ERROR,
  FILTER_PRODUCTS,
  REMOVE_FROM_CART,
  ADD_TO_CART_SUCCESS,
  INCREASE_QUANTITY_SUCCESS,
  DECREASE_QUANTITY,
  GET_ALL_REVIEWS,
  EMPTY_CART,
  GET_CART,
  GET_USER_DATA,
  GET_USER_ADDRESS,
} from "../actions";

const initialState = {
  allProducts: [],
  productByDessert: [],
  filteredProducts: [],
  idProduct: {},
  dessert: [],
  dessertCreate: [],
  errorForm: null,
  cartItems: [],
  allReview: [],
  userData: {},
  userAddress:[]
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload,
        productByDessert: action.payload,
        filteredProducts: action.payload,
      };

    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        idProduct: action.payload,
      };

    case LIMPIAR_DETAILS:
      return {
        ...state,
        idProduct: [],
      };

    case EMPTY_CART:
      return {
        ...state,
        cartItems: [],
      };

    case GET_DESSERT:
      return {
        ...state,
        dessert: action.payload,
      };

    case SEARCH_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload,
      };

    case ORDER_PRODUCTS:
      const order =
        action.payload === "max-min"
          ? state.allProducts.sort((a, b) => b.price - a.price)
          : action.payload === "min-max"
          ? state.allProducts.sort((a, b) => a.price - b.price)
          : action.payload === "asc"
          ? state.allProducts.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
              return 0;
            })
          : state.allProducts.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
              if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
              return 0;
            });

      return {
        ...state,
        products: order,
      };

    case CREATE_DESERT:
      return {
        ...state,
        dessertCreate: [...state.productByDessert, action.payload],
      };

    case FORM_ERROR:
      return {
        ...state,
        errorForm: action.payload,
      };

    case FILTER_PRODUCTS:
      let filtered =
        action.payload === "all"
          ? state.filteredProducts
          : state.filteredProducts.filter((product) =>
              product.desserts[0].name.includes(action.payload)
            );
      return {
        ...state,
        allProducts: filtered,
      };
    case GET_CART:
      console.log(action.payload);
      return {
        ...state,
        cartItems: action.payload,
      };
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
      };

    case INCREASE_QUANTITY_SUCCESS:
      return {
        ...state,
      };

    case DECREASE_QUANTITY:
      return {
        ...state,
      };
    case GET_ALL_REVIEWS:
      return {
        ...state,
        allReview: action.payload,
      };

    case GET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case GET_USER_ADDRESS:
      return {
        ...state,
        userAddress: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;