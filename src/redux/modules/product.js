const LOAD = 'product/LOAD';
const LOAD_SUCCESS = 'product/LOAD_SUCCESS';
const LOAD_FAIL = 'product/LOAD_FAIL';
const CREATE = 'product/CREATE';
const CREATE_SUCCESS = 'product/CREATE_SUCCESS';
const CREATE_FAIL = 'product/CREATE_FAIL';
const GET = 'product/GET';
const GET_SUCCESS = 'product/GET_SUCCESS';
const GET_FAIL = 'product/GET_FAIL';
const GETBYID = 'product/GETBYID';
const GETBYID_SUCCESS = 'product/GETBYID_SUCCESS';
const GETBYID_FAIL = 'product/GETBYID_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        market: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case CREATE:
      return {
        ...state,
        creating: true
      };
    case CREATE_SUCCESS:
      return {
        ...state,
        creating: false,
        created: true,
        createdProduct: action.result
      };
    case CREATE_FAIL:
      return {
        ...state,
        creating: false,
        created: false,
        error: action.error
      };
    case GET:
      return {
        ...state,
        getting: true
      };
    case GET_SUCCESS:
      return {
        ...state,
        getting: false,
        got: true,
        products: action.result
      };
    case GET_FAIL:
      return {
        ...state,
        getting: false,
        got: false,
        error: action.error
      };
    case GETBYID:
      return {
        ...state,
        gettingById: true
      };
    case GETBYID_SUCCESS:
      return {
        ...state,
        gettingById: false,
        gotById: true,
        product: action.result
      };
    case GETBYID_FAIL:
      return {
        ...state,
        gettingById: false,
        gotById: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.product && globalState.product.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/market')
  };
}

export function create(product) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (client) => client.post('/products', { data: product })
  };
}

export function isAllLoaded(globalState) {
  return globalState.product && globalState.product.got;
}

export function getAll() {
  return {
    types: [GET, GET_SUCCESS, GET_FAIL],
    promise: (client) => client.get('/products')
  };
}

export function isProductLoaded(globalState, id) {
  return globalState.product && globalState.product.gotById &&
        globalState.product.product.id === id;
}

export function getById(id) {
  return {
    types: [GETBYID, GETBYID_SUCCESS, GETBYID_FAIL],
    promise: (client) => client.get('/products/' + id)
  };
}
