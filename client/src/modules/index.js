import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import client from './client'
import settings from './settings'

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  client,
  settings
});
