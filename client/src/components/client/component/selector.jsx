import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field } from 'redux-form';
import { required } from '../../../utils/validation';

const renderSelect = ({ input, label, type, meta: { error, touched } }, items) => (
  <div className="form-group">
    <select {...input}>
      <option value="">Please select one</option>
      {
        items.map(({ clientName, clientEmail }, index) => 
          <option value={index} key={index}>{`${clientName} - ${clientEmail}`}</option>)
      }
    </select>
    {error && touched && <div className="text-danger">{error}</div>}
  </div>
)
  
export class ClientSelector extends Component {
  render() {
    const { clients } = this.props;
    return (
      <div>
        <p>Select the client</p>
        <Field name="selectedClient" validate={required} component={(field) => renderSelect(field, clients)} />
      </div>
    )
  }
}

ClientSelector.propTypes = {
  clients: PropTypes.array
}

export default connect(
  (state) => ({ clients: state.client.listing }),
  (dispatch) => bindActionCreators({ }, dispatch)
)(ClientSelector);