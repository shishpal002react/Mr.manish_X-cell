import * as types from "./actionTypes";
const user = JSON.parse(localStorage.getItem("userData"));
const userData = {
  token: "" || user?.accessToken,
  isAuth: user ? true : false,
  user: user || [],
  isLooding: false,
  isError: false,
  roles: [],
  branches: [],
  products: [],
  orders: [],
  terms: [],
  citys: [],
  AllAdmins: [],
};

export function AuthReducer(state = userData, action) {
  const { type, payload } = action;
  switch (type) {
    case types.SIGNUP_LOODING_REQUEST:
      return {
        ...state,
        isLooding: true,
      };
    case types.SIGNUP_SUCCESS_REQUEST:
      return {
        ...state,
        isLooding: false,
      };
    case types.SIGNUP_FAILURE_REQUEST:
      return {
        ...state,
        isLooding: false,
        isError: true,
        isErrorData: payload,
      };
    case types.SIGNIN_LOODING_REQUEST:
      return {
        ...state,
        isLooding: true,
      };
    case types.SIGNIN_SUCCESS_REQUEST:
      return {
        ...state,
        isLooding: false,
        token: payload.accessToken,
        isAuth: true,
      };
    case types.SIGNIN_FAILURE_REQUEST:
      return {
        ...state,
        isLooding: false,
        isError: true,
        isErrorData: payload,
        token: "",
      };
    case types.SIGNOUT_REQUEST:
      return {
        ...state,
      };
    case types.GET_ROLES_SUCCESS:
      return {
        ...state,
        roles: payload,
      };
    case types.GET_BRANCHES_SUCCESS:
      return {
        ...state,
        branches: payload,
      };
    case types.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: payload,
      };
    case types.GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: payload,
      };
    case types.GET_TERMS_SUCCESS:
      return {
        ...state,
        terms: payload,
      };
    case types.GET_HUB_CITIES_SUCCESS:
      return {
        ...state,
        citys: payload,
      };
    case types.GET_ALL_ADMIN_SUCCESS:
      return {
        ...state,
        AllAdmins: payload,
      };
    default:
      return state;
  }
}
