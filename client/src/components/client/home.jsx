import React, { Component } from 'react'
import ClientListing from './component/listing'
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { getClient } from '../../modules/client';

export class ClientHome extends Component {
  componentDidMount() {
    this.props.getClient()
  }

  render() {
    const { listing, goto } = this.props;
    return (
      <div className="col-md-12">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h2>Client</h2>
          </div>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-12">
                <div className="pull-right">
                  <Button onClick={() => goto('/client/create')} className="btn btn-primary btn-sm"><i className="fa fa-plus"></i> Create new</Button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <ClientListing clients={listing} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({ listing: state.client.listing }),
  dispatch => bindActionCreators({ getClient, goto: (x) => push(x) }, dispatch)
)(ClientHome);
