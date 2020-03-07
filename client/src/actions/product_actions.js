import axios from "axios";
import {
  GET_PRODUCT_BY_ARRIVAL,
  GET_PRODUCT_BY_SELL,
  GET_WOODS,
  GET_BRANDS,
  GET_PRODUCTS_TO_SHOP,
  ADD_PRODUCT
} from "./types";
import { PRODUCT_SERVER } from "../components/utils/misc";

export function getProductBySell() {
  // sortedBy=createdAt&Order=desc&limit=4
  const request = axios
    .get(`${PRODUCT_SERVER}/guitars?sortBy=sold&Order=desc&limit=4`)
    .then(res => res.data);

  return { type: GET_PRODUCT_BY_SELL, payload: request };
}
export function getProductByArrival() {
  const request = axios
    .get(`${PRODUCT_SERVER}/guitars?sortBy=createdAt&Order=desc&limit=4`)
    .then(res => res.data);

  return { type: GET_PRODUCT_BY_ARRIVAL, payload: request };
}

export function getBrands() {
  const request = axios.get(`${PRODUCT_SERVER}/brands`).then(res => res.data);

  return { type: GET_BRANDS, payload: request };
}

export function getWoods() {
  const request = axios.get(`${PRODUCT_SERVER}/woods`).then(res => res.data);

  return { type: GET_WOODS, payload: request };
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
