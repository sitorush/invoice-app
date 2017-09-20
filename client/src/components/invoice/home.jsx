import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap'
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux'
import { getInvoices } from '../../modules/invoice';
import InvoiceListing from './component/listing';

export class InvoiceHome extends Component {
  componentDidMount() {
    this.props.getInvoices()
  }

  render() {
    const { goto } = this.props;
    return (
      <div className="col-md-12">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h2>Invoices</h2>
          </div>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-12">
                <div className="pull-right">
                  <Button onClick={() => goto('/invoice/create')} className="btn btn-primary btn-sm"><i className="fa fa-plus"></i> Create new</Button>
                </div>
              </div>
            </div>
            <InvoiceListing></InvoiceListing>
          </div>
        </div>
      </div>
    );
  }
}


InvoiceHome.propTypes = {
  getInvoices: PropTypes.func.isRequired,
  pushState: PropTypes.func.isRequired
};

export default connect(
  state => ({}),
  dispatch => bindActionCreators({ getInvoices, goto: (x) => push(x), pushState: push }, dispatch)
)(InvoiceHome);
