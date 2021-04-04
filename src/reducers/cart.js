import {
  ADD_TO_CART,
  DELETE_FROM_CART,
  EMPTY_CART
} from "../constants/constants";

const cart = (state = { cartItems: [] }, action) => {
  const { type, payload } = action;
  const { cartItems } = state;
  const index = cartItems.findIndex(
    (val) =>
      val.id === payload.productId && val.category === payload.category
  );
  switch (type) {
    case ADD_TO_CART:
      if (index >= 0) {
        const existingQty = cartItems[index].qty;
        const totalQty = existingQty + payload.qty;
        cartItems.splice(index, 1, {
          id: payload.productId,
          qty: totalQty,
          category: payload.category,
        });
      } else {
        cartItems.push({
          id: payload.productId,
          qty: 1,
          category: payload.category,
        });
      }
      return {
        ...state,
        cartItems,
      };
    case DELETE_FROM_CART:
      cartItems.splice(index, 1);
      return {
        ...state,
        cartItems,
      };
      case EMPTY_CART:
        return{
          ...state,
          cartItems: []
        }
    default:
      return state;
  }
};

export default cart;
