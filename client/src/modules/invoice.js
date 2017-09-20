import fetchUrl from '../utils/fetch';

import { getClient } from './client';

const REQUEST_FAIL = 'invoice/REQUEST_FAIL';
const SAVE_INVOICE_LOAD = 'invoice/SAVE_INVOICE_LOAD';
const SAVE_INVOICE_SUCCESS = 'invoice/SAVE_INVOICE_SUCCESS';
const GET_INVOICE_SUCCESS = 'invoice/GET_INVOICE_SUCCESS';
const GET_INVOICES_SUCCESS = 'invoice/GET_INVOICES_SUCCESS';
const GET_INVOICES_LOAD = 'invoice/GET_INVOICES_LOAD';
const GET_INVOICE_LOAD = 'invoice/GET_INVOICE_LOAD';
const REMOVE_LOAD = 'invoice/REMOVE_LOAD';
const REMOVE_SUCCESS = 'invoice/REMOVE_SUCCESS';

const initialState = {
  invoiceFields: {
    clientId: '',
    invoiceItems: [{}]
  },
  listing: [],
  saveSuccess: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REQUEST_FAIL:
      // TODO handle failure
      break;
    case REMOVE_SUCCESS:
    case GET_INVOICES_SUCCESS:
      return {
        ...state,
        listing: action.results
      };
    case SAVE_INVOICE_LOAD:
      return {
        ...state,
        saveSuccess: false
      };
    case GET_INVOICE_SUCCESS:
      return {
        ...state,
        invoiceFields: action.result
      };
    case SAVE_INVOICE_SUCCESS:
      return {
        ...state,
        saveSuccess: true
      };
    default:
      return state;
  }
}

export const saveInvoice = ({ selectedClient, invoiceItems, _id }) => {
  return (dispatch, getState) => {
    dispatch({ type: SAVE_INVOICE_LOAD })

    let method = 'POST';
    const { client: { listing }} = getState();
    const data = { client: listing[selectedClient], invoiceItems }

    if (_id) {
      data['_id'] = _id;
      method = 'PUT'
    }

    return fetchUrl('/invoice', { method, data})
      .then(() => dispatch({ type: SAVE_INVOICE_SUCCESS }))
      .catch(() => dispatch({ type: REQUEST_FAIL }))
  }
}

export const getInvoices = () => {
  return dispatch => {
    dispatch({ type: GET_INVOICES_LOAD })

    return fetchUrl('/invoice', { method: 'GET' })
      .then(results => dispatch({ type:  GET_INVOICES_SUCCESS, results }))
  }
}

export const getInvoiceFields = (id) => {
  return dispatch => {
    dispatch({ type: GET_INVOICE_LOAD })

    return fetchUrl(`/invoice/${id}`, { method: 'GET' });
  }
}

export const getInvoice = (id) => {
  return (dispatch, getState) => Promise.all([
    dispatch(getInvoiceFields(id)),
    dispatch(getClient())
  ]).then(([invoiceFields]) => {
    const { client: { listing }} = getState();
    listing.forEach((item, i) => {
      if (item._id === invoiceFields.client._id) {
        invoiceFields.selectedClient = i
      }
    });
    dispatch({ type:  GET_INVOICE_SUCCESS, result: invoiceFields });
  });
}

export const removeInvoice = (id) => {
  return dispatch => {
    dispatch({ type: REMOVE_LOAD })

    return fetchUrl('/invoice', {
        method: 'DELETE',
        data: { id }
      })
      .then((results) => { dispatch({ type: REMOVE_SUCCESS, results }) })
      .catch(() => dispatch({ type: REQUEST_FAIL }))
  }
}
