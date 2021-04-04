import {ADD_TO_CART, DELETE_FROM_CART, EMPTY_CART} from "../constants/constants";

export function addToCart(data){
    return({
        type: ADD_TO_CART,
        payload: data
    })
};

export function removeProduct(data){
    return({
        type: DELETE_FROM_CART,
        payload: data
    })
};

export function emptyCart(data){
    return({
        type: EMPTY_CART,
        payload: {}
    })
}