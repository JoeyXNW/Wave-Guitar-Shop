import axios from "axios";
import {
  GET_PRODUCT_BY_ARRIVAL,
  GET_PRODUCT_BY_SELL,
  GET_WOODS,
  GET_BRANDS,
  GET_PRODUCTS_TO_SHOP,
  ADD_PRODUCT,
  ADD_BRAND,
  ADD_WOOD,
  GET_GUITAR_BY_ID,
  CLEAR_PRODUCT_DETAIL,
  UPDATE_PRODUCT
} from "./types";
import { PRODUCT_SERVER } from "../components/utils/misc";

export function getProductBySell() {
  // sortedBy=createdAt&Order=desc&limit=4
  const request = axios
    .get(`${PRODUCT_SERVER}/guitars?sortBy=sold&order=desc&limit=4`)
    .then(res => res.data);

  return { type: GET_PRODUCT_BY_SELL, payload: request };
}
export function getProductByArrival() {
  const request = axios
    .get(`${PRODUCT_SERVER}/guitars?sortBy=createdAt&order=desc&limit=4`)
    .then(res => res.data);

  return { type: GET_PRODUCT_BY_ARRIVAL, payload: request };
}

export function getBrands() {
  const request = axios.get(`${PRODUCT_SERVER}/brands`).then(res => res.data);

  return { type: GET_BRANDS, payload: request };
}

export function addBrand(dataToSubmit, previousBrands) {
  const request = axios
    .post(`${PRODUCT_SERVER}/brand`, dataToSubmit)
    .then(res => {
      let brands = [...previousBrands, res.data.brand];

      return { success: res.data.success, brands };
    });

  return { type: ADD_BRAND, payload: request };
}

export function getWoods() {
  const request = axios.get(`${PRODUCT_SERVER}/woods`).then(res => res.data);

  return { type: GET_WOODS, payload: request };
}

export function addWood(dataToSubmit, previousWoods) {
  const request = axios
    .post(`${PRODUCT_SERVER}/wood`, dataToSubmit)
    .then(res => {
      let woods = [...previousWoods, res.data.wood];

      return { success: res.data.success, woods };
    });

  return { type: ADD_WOOD, payload: request };
}

export function getProductsToShop(
  skip,
  limit,
  filters = [],
  previousState = []
) {
  const data = { limit, skip, filters };
  const request = axios.post(`${PRODUCT_SERVER}/shop`, data).then(res => {
    let newState = [...previousState, ...res.data.guitars];

    return { size: res.data.size, guitars: newState };
  });

  return { type: GET_PRODUCTS_TO_SHOP, payload: request };
}

export function addProduct(dataToSubmit) {
  const request = axios
    .post(`${PRODUCT_SERVER}/guitar`, dataToSubmit)
    .then(res => res.data);

  return { type: ADD_PRODUCT, payload: request };
}

export function getGuitarById(id) {
  const request = axios
    .get(`${PRODUCT_SERVER}/guitars_by_id?id=${id}&type=single`)
    .then(res => res.data[0]);

  return { type: GET_GUITAR_BY_ID, payload: request };
}

export function clearProductDetail() {
  return { type: CLEAR_PRODUCT_DETAIL, payload: "" };
}

export function updateProduct(dataToSubmit) {
  const request = axios
    .post(`${PRODUCT_SERVER}/update_product`, dataToSubmit)
    .then(res => res.data);

  return { type: UPDATE_PRODUCT, payload: request };
}
