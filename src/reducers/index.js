import { combineReducers } from "redux";
import cart from "./cart";
import userDetails from "./account";

export default combineReducers({
    cart,
    userDetails
});