import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import * as clientActions from '../../../modules/client';
import { required, email } from '../../../utils/validation';
import { renderFields } from '../../../utils/form';

export class ClientForm extends Component {
  render() {
    const { handleSubmit } = this.props;

    const colA = [
      { name: 'clientName', label: 'Name' },
      { name: 'clientEmail', label: 'Email address', validate: [required, email], type: 'email' },
      { name: 'addressLine1', label: 'Address line 1' },
      { name: 'addressLine2', label: 'Address line 2' }
    ]

    const colB = [
      { name: 'addressTown', label: 'Town' },
      { name: 'addressPostcode', label: 'Postcode' },
      { name: 'addressCounty', label: 'County/State' },
      { name: 'addressCountry', label: 'Country' }
    ]

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <legend>Client Details:</legend>
          <div className="row">
            <div className="col-sm-6">
              {renderFields(colA)}
            </div>
            <div className="col-sm-6">
              {renderFields(colB)}
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 col-md-offset-9">
              <div>
                <Button type="submit" className="btn btn-primary">Save</Button>
                <Link to="/client"><Button type="button" className="btn btn-default" style={{ marginLeft: '10px' }}>Cancel</Button></Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

ClientForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

ClientForm = reduxForm({ form: 'client' })(ClientForm);

export default connect(
  () => ({}),
  dispatch => bindActionCreators(clientActions, dispatch)
)(ClientForm);
