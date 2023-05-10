import { GET_ALL_PRODUCTS, GET_PRODUCT_BY_NAME, GET_PRODUCT_BY_ID, GET_DETAILS, LIMPIAR_DETAILS } from "../actions";



const initialState = {
  allProducts: [],
  idProduct:[],
  detail : []
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
        case GET_DETAILS:
            return{
                ...state,
                detail: action.payload
            }
        case LIMPIAR_DETAILS:
            return{
                ...state,
                detail: []
            }     
        default:
            return {
                ...state
            }
    }
}

export default rootReducer;
