import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART,
  GET_CART_ITEM,
  REMOVE_CART_ITEM,
  ORDER_SUCCESS,
  UPDATE_USER,
  CLEAR_USER_INFO,
  RESET_PASSWORD,
  RESET_USER
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
    case UPDATE_USER:
      return {
        ...state,
        updateUserSuccess: action.payload.success
        // userData: action.payload.userData
      };
    case CLEAR_USER_INFO:
      return { ...state, updateUserSuccess: action.payload };
    case RESET_PASSWORD:
      return { ...state, resetPasswordSuccess: action.payload };
    case RESET_USER:
      return { ...state, resetSuccess: action.payload };
    default:
      return state;
  }
}
