const LOAD = 'auth/LOAD';
const LOAD_SUCCESS = 'auth/LOAD_SUCCESS';
const LOAD_FAIL = 'auth/LOAD_FAIL';
const SIGNUP = 'auth/SIGNUP';
const SIGNUP_SUCCESS = 'auth/SIGNUP_SUCCESS';
const SIGNUP_FAIL = 'auth/SIGNUP_FAIL';
const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'auth/LOGIN_FAIL';
const LOGOUT = 'auth/LOGOUT';
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'auth/LOGOUT_FAIL';
const UPDATE = 'auth/UPDATE';
const UPDATE_SUCCESS = 'auth/UPDATE_SUCCESS';
const UPDATE_FAIL = 'auth/UPDATE_FAIL';
const DELETE = 'auth/DELETE';
const DELETE_SUCCESS = 'auth/DELETE_SUCCESS';
const DELETE_FAIL = 'auth/DELETE_FAIL';
const USERS = 'auth/USERS';
const USERS_SUCCESS = 'auth/USERS_SUCCESS';
const USERS_FAIL = 'auth/USERS_FAIL';
const ADDCART = 'auth/ADDCART';
const ADDCART_SUCCESS = 'auth/ADDCART_SUCCESS';
const ADDCART_FAIL = 'auth/ADDCART_FAIL';
const DELCART = 'auth/DELCART';
const DELCART_SUCCESS = 'auth/DELCART_SUCCESS';
const DELCART_FAIL = 'auth/DELCART_FAIL';

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
        user: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case SIGNUP:
      return {
        ...state,
        signingUp: true
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signingUp: false,
        user: action.result
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        signingIn: false,
        user: null,
        signupError: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: action.result
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    case UPDATE:
      return {
        ...state,
        updating: true
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        updating: false,
        user: action.result
      };
    case UPDATE_FAIL:
      return {
        ...state,
        updating: false,
        updateError: action.error
      };
    case DELETE:
      return {
        ...state,
        deleting: true
      };
    case DELETE_SUCCESS:
      return {
        ...state,
        deleting: false,
        user: null
      };
    case DELETE_FAIL:
      return {
        ...state,
        deleting: false,
        deleteError: action.error
      };
    case USERS:
      return {
        ...state,
        usersLoading: true
      };
    case USERS_SUCCESS:
      return {
        ...state,
        usersLoading: false,
        usersLoaded: true,
        users: action.result
      };
    case USERS_FAIL:
      return {
        ...state,
        usersLoading: false,
        usersLoaded: false,
        usersError: action.error
      };
    case ADDCART:
      return {
        ...state,
        addingCart: true
      };
    case ADDCART_SUCCESS:
      return {
        ...state,
        addingCart: false,
        user: action.result
      };
    case ADDCART_FAIL:
      return {
        ...state,
        addingCart: false,
        cartAddError: action.error
      };
    case DELCART:
      return {
        ...state,
        deletingCart: true
      };
    case DELCART_SUCCESS:
      return {
        ...state,
        deletingCart: false,
        user: action.result
      };
    case DELCART_FAIL:
      return {
        ...state,
        deletingCart: false,
        cartDelError: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function isUsersLoaded(globalState) {
  return globalState.auth && globalState.auth.usersLoaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/load')
  };
}

export function signup(user) {
  return {
    types: [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL],
    promise: (client) => client.post('/users', { data: user })
  };
}

export function login(user) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/login', { data: user })
  };
}

export function update(id, data) {
  return {
    types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
    promise: (client) => client.put('/users/' + id, { data: data })
  };
}

export function remove(id) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
    promise: (client) => client.del('/users/' + id)
  };
}

export function users() {
  return {
    types: [USERS, USERS_SUCCESS, USERS_FAIL],
    promise: (client) => client.get('/users')
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get('/logout')
  };
}

export function addToCart(userId, id) {
  return {
    types: [ADDCART, ADDCART_SUCCESS, ADDCART_FAIL],
    promise: (client) => client.post('/users/' + userId + '/cart', {data: {productId: id}})
  };
}

export function deleteCartItem(userId, cartId) {
  return {
    types: [DELCART, DELCART_SUCCESS, DELCART_FAIL],
    promise: (client) => client.del('/users/' + userId + '/cart/' + cartId)
  };
}
