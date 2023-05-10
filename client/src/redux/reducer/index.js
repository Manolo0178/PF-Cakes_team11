import { GET_ALL_PRODUCTS, SEARCH_PRODUCTS } from "../actions";



const initialState = {
    allProducts:[],
    products: []
}

function rootReducer(state = initialState, action) { 
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state, allProducts:action.payload
            } 
            
        case SEARCH_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        default:
            return {
                ...state
            }
    }
}

export default rootReducer;
