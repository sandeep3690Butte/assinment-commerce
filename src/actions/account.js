import {SET_LOGIN_STATUS, SET_USER_DETAILS} from "../constants/constants";

export const setLoginStatus = status => {
    return({
        type: SET_LOGIN_STATUS,
        payload: {status}
    })
};

export const setUSerDetails = userId => {
    return({
        type: SET_USER_DETAILS,
        payload: {userId}
    })
}