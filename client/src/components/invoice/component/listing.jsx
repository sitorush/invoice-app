import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeInvoice } from '../../../modules/invoice';
import { bindActionCreators } from 'redux';

export class InvoiceListing extends Component {
  render() {
    const { listing, removeInvoice } = this.props; // eslint-disable-line no-shadow
    const clientRows = listing && listing.length > 0 ? listing.map((item) => (
      <tr key={item._id}>
        <td>
          <p>Client:{item.client.clientName} <br/>
          Invoice no: {item.client.invNumber}
          {/*WIP*/}
          </p>
        </td>
        <td>
          <div className={`text-right`}>
            <Link to={'/invoice/edit/' + item._id}>
              <button className="btn btn-default btn-sm"><i className="fa fa-pencil"></i> Edit</button>
            </Link>
            <button style={{marginLeft: '10px'}} className="btn btn-default" onClick={() => window.confirm('Yes, I want to remove this entry') && removeInvoice(item._id)}><i className="fa fa-times"></i> Remove</button>
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

InvoiceListing.propTypes = {
  listing: PropTypes.array,
  removeInvoice: PropTypes.func
};

export default connect(
  state => ({ listing: state.invoice.listing }),
  dispatch => bindActionCreators({ removeInvoice }, dispatch)
)(InvoiceListing);
