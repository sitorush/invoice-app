import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FieldArray } from 'redux-form';
import { renderItems } from './helper'

export class InvoiceItems extends Component {
  render() {
    return <FieldArray name="invoiceItems" component={renderItems}></FieldArray>
  }
}

export default connect(
  state => ({ invoiceItems: state.invoice.invoiceItems }),
  (dispatch) => bindActionCreators({ }, dispatch)
)(InvoiceItems);
