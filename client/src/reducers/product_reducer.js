import {
  ADD_BRAND,
  ADD_PRODUCT,
  ADD_WOOD,
  GET_BRANDS,
  GET_PRODUCT_BY_ARRIVAL,
  GET_PRODUCT_BY_SELL,
  GET_PRODUCTS_TO_SHOP,
  GET_WOODS,
  GET_GUITAR_BY_ID,
  CLEAR_PRODUCT_DETAIL
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
    case GET_GUITAR_BY_ID:
      return { ...state, guitar: action.payload };
    case ADD_BRAND:
      return {
        ...state,
        addBrandSuccess: action.payload.success,
        brands: action.payload.brands
      };
    case GET_WOODS:
      return { ...state, woods: action.payload };
    case ADD_WOOD:
      return {
        ...state,
        addWoodSuccess: action.payload.success,
        woods: action.payload.woods
      };
    case GET_PRODUCTS_TO_SHOP:
      return {
        ...state,
        toShop: action.payload.guitars,
        toShopSize: action.payload.size
      };
    case CLEAR_PRODUCT_DETAIL:
      return { ...state, guitar: action.payload };
    default:
      return state;
  }
}
