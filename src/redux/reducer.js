import axios from "axios";

const initialState = {
  user: {
    userId: 0,
    username: "",
    email: "",
    profile_pic: "",
    first_name: "",
    last_name: "",
    isLoggedIn: false,
  },
  products: [],
  reviews: [],
  cart: [],
  order: [],
};

//PRODUCT
const GET_PRODUCTS = "GET_PRODUCTS";
const ADD_PRODUCT = "ADD_PRODUCT";

//REVIEWS
const GET_REVIEWS = "GET_REVIEWS";
const POST_REVIEW = "POST_REVIEW";

//CART & ORDER
const GET_CART = "GET_CART";
const GET_ORDER = "GET_ORDER";

//AUTH
const LOGIN_USER = "LOGIN_USER";
const LOGOUT = "LOGOUT";
const GET_USER = "GET_USER";

//USER FUNCTIONS
export function loginUser(user) {
  return {
    type: LOGIN_USER,
    payload: user,
  };
}

export function logoutUser() {
  return {
    type: LOGOUT,
    payload: initialState,
  };
}

export function getUser() {
  const user = axios.get("/auth/user");
  return {
    type: GET_USER,
    payload: user,
  };
}

//PRODUCT FUNCTIONS
export function getProducts() {
  const products = axios.get("/api/products");
  return {
    type: GET_PRODUCTS,
    payload: products,
  };
}

export function addProduct() {
  const product = axios.post("/api/product").then((res) => res.product);
  return {
    type: ADD_PRODUCT,
    payload: product,
  };
}

//REVIEW FUNCTIONS
export function getReviews() {
  const reviews = axios.get("/api/reviews/:id").then((res) => res.reviews);
  return {
    type: GET_REVIEWS,
    payload: reviews,
  };
}

export function postReview() {
  const review = axios.post("/api/review").then((res) => res.review);
  return {
    type: POST_REVIEW,
    payload: review,
  };
}

//CART & ORDER FUNCTIONS
export function getCart() {
  const cart = axios.get("/api/cart/:id").then((res) => res.cart);
  return {
    type: GET_CART,
    payload: cart,
  };
}

export function getOrder() {
  const order = axios.get("/api/order/:id").then((res) => res.order);
  return {
    type: GET_ORDER,
    payload: order,
  };
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCTS + "_PENDING":
      return state;
    case GET_PRODUCTS + "_FULFILLED":
      return { ...state, products: payload };
    case GET_PRODUCTS + "_REJECTED":
      return initialState;
    case GET_REVIEWS + "_FULFILLED":
      return { ...state, reviews: payload };
    case POST_REVIEW + "_FULFILLED":
      return { ...state, reviews: payload };
    case ADD_PRODUCT + "_FULFILLED":
      return { ...state, products: payload };
    case GET_CART + "_FULFILLED":
      return { ...state, cart: payload };
    case GET_ORDER + "_FULFILLED":
      return { ...state, order: payload };
    case LOGIN_USER:
      return { ...state, user: payload, isLoggedIn: true };
    case LOGOUT:
      return { ...state, ...payload };
    case GET_USER + "_PENDING":
      return state;
    case GET_USER + "_FULFILLED":
      return { ...state, user: payload.data, isLoggedIn: true };
    case GET_USER + "_REJECTED":
      return initialState;
    default:
      return state;
  }
}
