

import { GET_ALL_PRODUCTS,  GET_PRODUCT_BY_ID, LIMPIAR_DETAILS, SEARCH_PRODUCTS,ORDER_PRODUCTS } from "../actions";




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
        case GET_PRODUCT_BY_ID:
            return {
                ...state,
                idProduct: action.payload,
            };   
    
        case LIMPIAR_DETAILS:
            return{
                ...state,
                idProduct: []
            }     
           
        case SEARCH_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        case ORDER_PRODUCTS:
            const order = action.payload === "max-min" ? state.allProducts.sort((a,b)=>b.price - a.price) : 
            action.payload === "min-max" ? state.allProducts.sort((a,b)=>a.price - b.price) : 
            action.payload === "asc" ?
            state.allProducts.sort((a,b)=>{
                if(a.name.toLowerCase()>b.name.toLowerCase()) return 1;
                if(a.name.toLowerCase()<b.name.toLowerCase()) return -1;
                return 0;
            }) :  
            state.allProducts.sort((a,b)=>{
                if(a.name.toLowerCase()>b.name.toLowerCase()) return -1;
                if(a.name.toLowerCase()<b.name.toLowerCase()) return 1;
                return 0;
            });
            
            return {
                ...state,
                products: order
            }    

        default:
            return {
                ...state
            }
    }
}

export default rootReducer;
