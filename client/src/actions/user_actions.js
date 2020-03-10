import axios from "axios";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART,
  GET_CART_ITEM,
  REMOVE_CART_ITEM,
  ORDER_SUCCESS
} from "./types";

import { USER_SERVER, PRODUCT_SERVER } from "../components/utils/misc";

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .then(res => res.data);

  return { type: LOGIN_USER, payload: request };
}

export function registerUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/register`, dataToSubmit)
    .then(res => res.data);

  return { type: REGISTER_USER, payload: request };
}

export function auth() {
  const request = axios.get(`${USER_SERVER}/auth`).then(res => res.data);

  return { type: AUTH_USER, payload: request };
}

export function logoutUser() {
  const request = axios.get(`${USER_SERVER}/logout`).then(res => res.data);

  return { type: LOGOUT_USER, payload: request };
}

export function addToCart(_id) {
  const request = axios
    .post(`${USER_SERVER}/addtocart?productId=${_id}`)
    .then(res => res.data);

  return { type: ADD_TO_CART, payload: request };
}

export function getCartItem(cartItems, userCart) {
  // turn userCart to a dictionary to save time
  let dic = {};
  userCart.forEach(item => {
    dic[item.id] = item.quantity;
  });

  const request = axios
    .get(`${PRODUCT_SERVER}/guitars_by_id?id=${cartItems}&type=array`)
    .then(res => {
      res.data.forEach(item => (item.quantity = dic[item._id]));
      return res.data;
    });

  return { type: GET_CART_ITEM, payload: request };
}

export function removeCartItem(id, quantity) {
  const request = axios
    .get(`${USER_SERVER}/removefromcart?_id=${id}&qty=${quantity}`)
    .then(res => {
      let dic = {};
      res.data.cart.forEach(item => {
        dic[item.id] = item.quantity;
      });

      res.data.cartDetail.forEach(item => (item.quantity = dic[item._id]));
      return res.data;
    });

  return { type: REMOVE_CART_ITEM, payload: request };
}

export function orderSuccess(data) {
  const request = axios
    .post(`${USER_SERVER}/ordersuccess`, data)
    .then(res => res.data);

  return { type: ORDER_SUCCESS, payload: request };
}
