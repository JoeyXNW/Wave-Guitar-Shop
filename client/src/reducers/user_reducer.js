import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART,
  GET_CART_ITEM,
  REMOVE_CART_ITEM,
  ORDER_SUCCESS
} from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case REGISTER_USER:
      return { ...state, registerSuccess: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    case LOGOUT_USER:
      return { ...state, logoutSuccess: action.payload };
    case GET_CART_ITEM:
      return { ...state, cartDetail: action.payload };
    case ORDER_SUCCESS:
      return {
        ...state,
        success: action.payload.success,
        userData: { ...state.userData, cart: action.payload.cart },
        cartDetail: action.payload.cartDetail
      };
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartDetail: action.payload.cartDetail,
        userData: {
          ...state.userData,
          cart: action.payload.cart,
          cartTotal: action.payload.cartTotal
        }
      };
    case ADD_TO_CART:
      return {
        ...state,
        userData: {
          ...state.userData,
          cart: action.payload.cart,
          cartTotal: action.payload.cartTotal
        }
      };
    default:
      return state;
  }
}
