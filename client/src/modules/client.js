import fetchUrl from '../utils/fetch';

const REQUEST_FAIL = 'client/REQUEST_FAIL';
const INSERT_NEW = 'client/INSERT_NEW';
const INSERT_SUCCESS = 'client/INSERT_SUCCESS';
const UPDATE_NEW = 'client/UPDATE_NEW';
const UPDATE_SUCCESS = 'client/UPDATE_SUCCESS';
const LISTING_LOAD = 'client/LISTING_LOAD';
const FIND_LOAD = 'client/FIND_LOAD';
const FIND_SUCCESS = 'client/FIND_SUCCESS';
const LISTING_SUCCESS = 'client/LISTING_SUCCESS';
const REMOVE_LOAD = 'client/REMOVE_LOAD';
const REMOVE_SUCCESS = 'client/REMOVE_SUCCESS';

const initialState = {
  saveError: null,
  listing: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REMOVE_SUCCESS:
    case LISTING_SUCCESS:
      return {
        ...state,
        listing: action.result
      };
    case UPDATE_NEW:
    case FIND_LOAD:
    case INSERT_NEW:
      return {
        ...state,
        insertSuccess: false
      };
    case FIND_SUCCESS:
      return {
        ...state,
        client: action.result
      };
    case UPDATE_SUCCESS:
    case INSERT_SUCCESS:
      return {
        ...state,
        insertSuccess: true
      };
    case REQUEST_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        errorMessage: action.error
      } : state;
    default:
      return state;
  }
}

export const insertClient = (data) => {
  return dispatch => {
    dispatch({ type: INSERT_NEW })

    return fetchUrl('/client', {
        method: 'POST',
        data
      })
      .then((res) => dispatch({ type: INSERT_SUCCESS }))
      .catch(() => dispatch({ type: REQUEST_FAIL }))
  }
}

export const updateClient = (data) => {
  return dispatch => {
    dispatch({ type: UPDATE_NEW })

    return fetchUrl('/client', {
        method: 'PUT',
        data
      })
      .then((res) => dispatch({ type: UPDATE_SUCCESS }))
      .catch(() => dispatch({ type: REQUEST_FAIL }))
  }
}

export function findClient(id) {
  return dispatch => {
    dispatch({ type: FIND_LOAD })

    return fetchUrl(`/client/${id}`, { method: 'GET' })
      .then((result) => { dispatch({ type: FIND_SUCCESS, result }) })
      .catch(() => dispatch({ type: REQUEST_FAIL }))
  }
}

export function getClient() {
  return dispatch => {
    dispatch({ type: LISTING_LOAD })

    return fetchUrl('/client', { method: 'GET' })
      .then((result) => { dispatch({ type: LISTING_SUCCESS, result }) })
      .catch(() => dispatch({ type: REQUEST_FAIL }))
  }
}

export function removeClient(id) {
  return dispatch => {
    dispatch({ type: REMOVE_LOAD })

    return fetchUrl('/client', {
        method: 'DELETE',
        data: { id }
      })
      .then((result) => { dispatch({ type: REMOVE_SUCCESS, result }) })
      .catch(() => dispatch({ type: REQUEST_FAIL }))
  }
}
