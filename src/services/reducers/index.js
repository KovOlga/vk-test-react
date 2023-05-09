import { combineReducers } from "redux";
import { formReducer } from "./form-book-conf";

export const rootReducer = combineReducers({
  confRoomForm: formReducer,
});
