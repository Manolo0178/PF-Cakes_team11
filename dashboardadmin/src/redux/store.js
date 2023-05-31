import {createStore, applyMiddleware, compose} from "redux";
import ThunkMiddleware from "redux-thunk";
import reducer from "./reducer.js";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(ThunkMiddleware))
)

export default store;