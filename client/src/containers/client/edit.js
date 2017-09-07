import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormClient from '../../components/form-client';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initialize } from 'redux-form';
import { push } from 'react-router-redux';
import { findClient, updateClient } from '../../modules/client';

export class ClientEdit extends Component {
  componentDidMount() {
    this.props.findClient(this.props.match.params.id)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.client) {
      this.props.initialize('client', nextProps.client);
    }
    if (nextProps.insertSuccess) {
      this.props.pushState('/client');
    }
  }

  componentWillUnmount() {
    this.props.initialize('client', {});
  }

  render() {
    const { updateClient } = this.props; // eslint-disable-line no-shadow

    return (
      <div>
        <FormClient onSubmit={updateClient} />
      </div>
    );
  }
}

ClientEdit.propTypes = {
  client: PropTypes.object,
  params: PropTypes.object,
  insertSuccess: PropTypes.bool,
  initialize: PropTypes.func.isRequired,
  updateClient: PropTypes.func.isRequired,
  findClient: PropTypes.func.isRequired,
  pushState: PropTypes.func.isRequired
};

export default connect(
  state => ({
    insertSuccess: state.client.insertSuccess,
    client: state.client.client
  }),
  dispatch => bindActionCreators({ initialize, findClient, updateClient, pushState: push }, dispatch)
)(ClientEdit);
