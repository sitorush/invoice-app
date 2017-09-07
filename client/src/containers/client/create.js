import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormClient from '../../components/form-client';
import { connect } from 'react-redux';
import { insertClient } from '../../modules/client';
import { push } from 'react-router-redux';

export class ClientCreate extends Component {
  componentWillReceiveProps(nextProps) {
    console.log('next props ', nextProps);
    
    if (nextProps.insertSuccess) {
      this.props.pushState('/client');
    }
  }

  render() {
    const { insertClient } = this.props; // eslint-disable-line no-shadow
    return (
      <div className="col-md-12">
        <div className="panel panel-default">
            <div className="panel-heading">
              <h2>Insert client details</h2>
            </div>
            <div className="panel-body">
               <FormClient onSubmit={insertClient} /> 
            </div>
        </div>
      </div>
    );
  }
}

ClientCreate.propTypes = {
  insertSuccess: PropTypes.bool,
  insertClient: PropTypes.func.isRequired,
  pushState: PropTypes.func.isRequired
};

export default connect(
  state => ({ insertSuccess: state.client.insertSuccess }),
  { insertClient, pushState: push }
)(ClientCreate);
