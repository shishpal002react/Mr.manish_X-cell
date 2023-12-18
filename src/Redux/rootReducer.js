import { combineReducers } from "redux";
import { AuthReducer } from "./Auth/reducer";

const rootreducer = combineReducers({
  AuthReducer,
});

export default rootreducer;
