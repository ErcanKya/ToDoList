import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import authReducer from "./user/auth/authReducer";
import todoReducer from "./todo/todoReducer";

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  todo: todoReducer,
});

export default rootReducer;
