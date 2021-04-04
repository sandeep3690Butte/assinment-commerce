import {SET_LOGIN_STATUS, SET_USER_DETAILS} from "../constants/constants";

const userDetails = (state={isLoggedIn:false}, action) => {
  const {type, payload} = action;
  switch(type){
      case SET_LOGIN_STATUS:
          return{
              ...state,
              isLoggedIn: payload.status
          }
        case SET_USER_DETAILS:
            return{
                ...state,
                userId: payload.userId
            }
        default: return state
  }
};

export default userDetails;