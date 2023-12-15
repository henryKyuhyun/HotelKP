// client/src/redux/rootReducer.js
import { combineReducers } from "redux";
import authReducer from "./slice/authSlice";
import likeReducer from "./slice/likeSlice";
import hotelReducer from "./slice/hotelSlice";
import commentReducer from "./slice/commentSlice"

const rootReducer = combineReducers({
  hotels: hotelReducer,
  auth: authReducer,
  like: likeReducer,
  comment: commentReducer,

});

export default rootReducer;
