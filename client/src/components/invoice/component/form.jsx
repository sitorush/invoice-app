import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import * as invoiceActions from '../../../modules/invoice';
import ClientSelector from '../../client/component/selector';
import InvoiceItems from './items'

export class InvoiceForm extends Component {
  render() {
    const { handleSubmit } = this.props; 
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <ClientSelector></ClientSelector>
          <InvoiceItems></InvoiceItems>
          <div className="row">
            <div className="col-md-3 col-md-offset-9">
              <div>
                <Button type="submit" className="btn btn-primary">Save</Button>
                <Link to="/"><Button type="button" className="btn btn-default" 
                  style={{ marginLeft: '10px' }}>Cancel</Button></Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

InvoiceForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

InvoiceForm = reduxForm({ form: 'invoice' })(InvoiceForm);

export default connect(
  (state) => ({}),
  (dispatch) => bindActionCreators(invoiceActions, dispatch)
)(InvoiceForm);
