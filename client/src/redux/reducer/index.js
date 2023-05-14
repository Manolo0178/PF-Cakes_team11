import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
  LIMPIAR_DETAILS,
  SEARCH_PRODUCTS,
  ORDER_PRODUCTS,
  GET_DESSERT,
  CREATE_DESERT,
  FORM_ERROR,
} from "../actions";

const initialState = {
  allProducts: [],
  productByDessert: [],

  idProduct: {},
  dessert: [],
  dessertCreate: [],
  errorForm: null,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload,
        productByDessert: action.payload,
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
    default:
      return {
        ...state,
      };
  }
}

export default rootReducer;
