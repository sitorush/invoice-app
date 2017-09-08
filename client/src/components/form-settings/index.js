import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import * as clientActions from '../../modules/client';
import { required, email } from '../../utils/validation';
import { renderFields } from '../../utils/form';

export class FormSettings extends Component {
  render() {
    const { handleSubmit } = this.props;

    const colA = [
      { name: 'companyName', label: 'Company name' },
      { name: 'companyEmail', label: 'Email address', validate: [required, email], type: 'email' },
      { name: 'companyAddress', label: 'Address' },
      { name: 'companyPhone', label: 'Phone' },
      { name: 'companyMobile', label: 'Mobile' }
    ]

    const colB = [
      { name: 'companyBankName', label: 'Bank name' },
      { name: 'companySortcode', label: 'Sortcode' },
      { name: 'companyAccountNumber', label: 'Account number' }
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

FormSettings.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

FormSettings = reduxForm({ form: 'settings' })(FormSettings);

export default connect(
  () => ({}),
  dispatch => bindActionCreators(clientActions, dispatch)
)(FormSettings);
