import { GET_ALL_PRODUCTS, GET_PRODUCT_BY_NAME, GET_PRODUCT_BY_ID } from "../actions";



const initialState = {
  allProducts: [],
  idProduct:{}
};

function rootReducer(state = initialState, action) { 
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state, allProducts:action.payload
            }       
        case GET_PRODUCT_BY_NAME:
            if (action.payload.length != 0) {
                return {
                ...state,
                allProducts: action.payload,
                };
            }
            else {
                return {
                ...state
                }
            }
        case GET_PRODUCT_BY_ID:
            return {
                ...state,
                idProduct: action.payload,
            };        
        default:
            return {
                ...state
            }
    }
}

export default rootReducer;
