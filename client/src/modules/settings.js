import fetchUrl from '../utils/fetch';

const SAVE_LOAD = 'settings/SAVE_LOAD';
const SAVE_SUCCESS = 'settings/SAVE_SUCCESS';
const REQUEST_FAIL = 'settings/REQUEST_FAIL';
const GET_SETTINGS_LOAD = 'settings/GET_SETTINGS_LOAD';
const GET_SETTINGS_SUCCESS = 'settings/GET_SETTINGS_SUCCESS';

const initialState = {
  saveSettingsSuccess: false
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SAVE_SUCCESS:
      return {
        ...state,
        saveSettingsSuccess: true
      };
    case GET_SETTINGS_LOAD:
      return {
        ...state,
        saveSettingsSuccess: false
      };
    case GET_SETTINGS_SUCCESS:
      return {
        ...state,
        data: action.result
      };
    default:
      return state;
  }
}

export function saveSettings(data) {
  return dispatch => {
    dispatch({ type: SAVE_LOAD })

    return fetchUrl('/settings', {
        method: 'POST',
        data: data
      })
      .then((result) => { dispatch({ type: SAVE_SUCCESS, result }) })
      .catch(() => dispatch({ type: REQUEST_FAIL }))
  }
}

export function getSettings(data) {
  return dispatch => {
    dispatch({ type: GET_SETTINGS_LOAD })

    return fetchUrl('/settings', { method: 'GET'})
      .then((results) => { dispatch({ type: GET_SETTINGS_SUCCESS, result: results[0] }) })
      .catch(() => dispatch({ type: REQUEST_FAIL }))
  }
}