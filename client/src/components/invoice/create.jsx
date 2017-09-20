import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initialize } from 'redux-form';
import InvoiceForm from  './component/form'
import { getClient } from '../../modules/client';
import { saveInvoice } from '../../modules/invoice';
import { push } from 'react-router-redux';

export class InvoiceCreate extends Component {
  componentDidMount() {
    this.props.getClient()
    if (this.props.invoiceFields) {
      // just set the default field
      this.props.initialize('invoice', {invoiceItems: [{}]});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.saveSuccess) {
      this.props.pushState('/invoice');
    }
  }

  render() {
    const { saveInvoice } = this.props;
    return (
      <div className="col-md-12">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h2>Create an invoice</h2>
          </div>
          <div className="panel-body">
            <InvoiceForm onSubmit={saveInvoice} />
          </div>
        </div>
      </div>
    );
  }
}

InvoiceCreate.propTypes = {
  invoiceFields: PropTypes.object,
  saveInvoice: PropTypes.func,
  saveSuccess: PropTypes.bool,
  getClient: PropTypes.func,
  initialize: PropTypes.func
};

export default connect(
  state => ({ 
    invoiceFields: state.invoice.invoiceFields,
    saveSuccess: state.invoice.saveSuccess
  }),
  dispatch => bindActionCreators({ initialize, getClient, saveInvoice, pushState: push }, dispatch)
)(InvoiceCreate);
