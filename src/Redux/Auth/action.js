import axios from "axios";
import * as types from "./actionTypes";
const BASE_URL = "https://mr-manish-xcell-backend.vercel.app/";
const userData = JSON.parse(localStorage.getItem("userData"));
const token = userData?.accessToken;


export const Signup = (data) => (dispatch) => {
  dispatch({ type: types.SIGNUP_LOODING_REQUEST });
  return axios
    .post(`${BASE_URL}api/v1/admin/signup`, data)
    .then((response) => {
      return dispatch({
        type: types.SIGNUP_SUCCESS_REQUEST,
        payload: response.data.message,
      });
    })
    .catch((error) => {
      return dispatch({
        type: types.SIGNUP_FAILURE_REQUEST,
        payload: error.response.data.message,
      });
    });
};

export const SignIn = (data) => (dispatch) => {
  dispatch({ type: types.SIGNIN_LOODING_REQUEST });
  return axios
    .post(`${BASE_URL}api/v1/admin/login`, data)
    .then((response) => {
      localStorage.setItem("userData", JSON.stringify(response.data));
      localStorage.setItem("token", response?.data?.accessToken);
      return dispatch({
        type: types.SIGNIN_SUCCESS_REQUEST,
        payload: response.data,
      });
    })
    .catch((error) => {
      return dispatch({
        type: types.SIGNIN_FAILURE_REQUEST,
        payload: error.response.data.message,
      });
    });
};

export const GetRoles = () => (dispatch) => {
  return axios.get(`${BASE_URL}api/v1/roles`).then((res) => {
    return dispatch({
      type: types.GET_ROLES_SUCCESS,
      payload: res.data.data,
    });
  });
};
export const GetBranches = () => (dispatch) => {
  return axios.get(`${BASE_URL}api/v1/branches`).then((res) => {
    return dispatch({
      type: types.GET_BRANCHES_SUCCESS,
      payload: res.data.data,
    });
  });
};

export const getAllProducts = () => (dispatch) => {
  return axios.get(`${BASE_URL}api/v1/products`).then((res) => {
    return dispatch({
      type: types.GET_PRODUCTS_SUCCESS,
      payload: res.data.data,
    });
  });
};

export const getAllOrders = () => (dispatch) => {
  return axios.get(`${BASE_URL}api/v1/orders`).then((res) => {
    return dispatch({
      type: types.GET_ORDERS_SUCCESS,
      payload: res.data.data,
    });
  });
};

export const getTerms = () => (dispatch) => {
  return axios.get(`${BASE_URL}api/v1/terms`).then((res) => {
    return dispatch({
      type: types.GET_TERMS_SUCCESS,
      payload: res.data.data,
    });
  });
};

export const getHubAndCities = () => (dispatch) => {
  return axios.get(`${BASE_URL}api/v1/hub-cities`).then((res) => {
    return dispatch({
      type: types.GET_HUB_CITIES_SUCCESS,
      payload: res.data,
    });
  });
};

export const getAllAdmins = () => (dispatch) => {
  return axios
    .get(`${BASE_URL}api/v1/admin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return dispatch({
        type: types.GET_ALL_ADMIN_SUCCESS,
        payload: res.data,
      });
    });
};

