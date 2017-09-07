import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeClient } from '../../modules/client';
import { bindActionCreators } from 'redux';

export class ClientListing extends Component {
  render() {
    const { clients, removeClient } = this.props; // eslint-disable-line no-shadow

    const clientRows = clients && clients.length > 0 ? clients.map((item) => (
      <tr key={item._id}>
        <td>{item.clientName} <br />
          {item.clientEmail} <br />
          {item.addressLine1} <br />
          {item.addressLine2 ? item.addressLine2 : ''}
          {item.addressPostcode}<br />
          {item.addressTown}<br />
          {item.addressCounty}<br />
          {item.addressCountry}<br />
        </td>
        <td>
          <div className={`text-right`}>
            <Link to={'/client/edit/' + item._id}>
              <button className="btn btn-default btn-sm"><i className="fa fa-pencil"></i> Edit</button>
            </Link>
            <button style={{marginLeft: '10px'}} className="btn btn-default" onClick={() => window.confirm('Yes, I want to remove this entry') && removeClient(item._id)}><i className="fa fa-times"></i> Remove</button>
          </div>
        </td>
      </tr>
    )) : (<tr>
      <td>No result is found</td>
    </tr>);

    return (
      <div>
        <table className="table table-striped dt-responsive nowrap dataTable no-footer dtr-inline">
          <tbody>
            {clientRows}
          </tbody>
        </table>
      </div>
    );
  }
}

ClientListing.propTypes = {
  listing: PropTypes.array,
  clients: PropTypes.array,
  removeClient: PropTypes.func
};

export default connect(
  state => ({ listing: state.client.listing }),
  dispatch => bindActionCreators({ removeClient }, dispatch)
)(ClientListing);
