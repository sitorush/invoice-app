import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initialize } from 'redux-form';
import InvoiceForm from  './component/form'
import { getClient } from '../../modules/client';
import { saveInvoice, getInvoice } from '../../modules/invoice';
import { push } from 'react-router-redux';

export class InvoiceEdit extends Component {
  componentDidMount() {
    this.props.getInvoice(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.invoiceFields) {
      this.props.initialize('invoice', nextProps.invoiceFields);
    }
    if (nextProps.saveSuccess) {
      this.props.pushState('/invoice');
    }
  }

  componentWillUnmount() {
    this.props.initialize('invoice', {});
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
            <InvoiceForm onSubmit={saveInvoice}></InvoiceForm>
          </div>
        </div>
      </div>
    );
  }
}

InvoiceEdit.propTypes = {
  invoiceFields: PropTypes.object,
  saveInvoice: PropTypes.func,
  getInvoice: PropTypes.func.isRequired,
  saveSuccess: PropTypes.bool,
  getClient: PropTypes.func,
  initialize: PropTypes.func
};

export default connect(
  state => ({ 
    invoiceFields: state.invoice.invoiceFields,
    saveSuccess: state.invoice.saveSuccess
  }),
  dispatch => bindActionCreators({ 
    initialize, getClient, saveInvoice, getInvoice, pushState: push 
  }, dispatch)
)(InvoiceEdit);
