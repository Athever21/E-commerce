import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";

import userReducer from "./redcuers/userReducer";

const combinedReducers = combineReducers({
  user: userReducer
});

export default createStore(combinedReducers,applyMiddleware(thunk));
