import {
  GET_PRODUCT_BY_SELL,
  GET_PRODUCT_BY_ARRIVAL,
  GET_BRANDS,
  GET_WOODS,
  GET_PRODUCTS_TO_SHOP,
  ADD_PRODUCT
} from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return { ...state, addProductSuccess: action.payload };
    case GET_PRODUCT_BY_SELL:
      return { ...state, bySell: action.payload };
    case GET_PRODUCT_BY_ARRIVAL:
      return { ...state, byArrival: action.payload };
    case GET_BRANDS:
      return { ...state, brands: action.payload };
    case GET_WOODS:
      return { ...state, woods: action.payload };
    case GET_PRODUCTS_TO_SHOP:
      return {
        ...state,
        toShop: action.payload.guitars,
        toShopSize: action.payload.size
      };
    default:
      return state;
  }
}
