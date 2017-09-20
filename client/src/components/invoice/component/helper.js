import React from 'react';
import { renderInput } from '../../../utils/form'
import { Field } from 'redux-form';
import { required, intOrFloat } from '../../../utils/validation';

export const renderItem = (item, index, items) =>
  <div className="row" key={index}>
    <div className="col-md-6">
      <div className="form-group">
        <Field component={renderInput} validate={required} name={`${item}description`} type="text" />
      </div>
    </div>
    <div className="col-md-2">
      <div className="form-group">
      <Field component={renderInput} validate={[required, intOrFloat]} name={`${item}quantity`} type="number" step="0.01" />
      </div>
    </div>
    <div className="col-md-2">
      <div className="form-group">
        <Field component={renderInput} validate={[required, intOrFloat]} name={`${item}unitPrice`} type="number" step="0.01" />
      </div>
    </div>
    <div className="col-md-2">
      { (items.length > 1) && <a onClick={() => items.length > 1 && items.remove(index)}>Remove</a> }
    </div>
  </div>

export const renderItems = ({ fields, meta: { touched, error } }) =>
  <div className="invoice-items">
    <div className="row">
      <div className="col-md-6">
        <label htmlFor="clientName">Item</label>
      </div>
      <div className="col-md-3">
        <label htmlFor="clientName">Quantity</label>
      </div>
      <div className="col-md-3">
        <label htmlFor="clientName">Unit price</label>
      </div>
    </div>
    { fields.map(renderItem) }
    <button className="btn btn-default btn-sm" onClick={(e) => {
      e.preventDefault(); fields.push({})
    }}><i className="fa fa-plus-circle"></i>  Add more item</button>
  </div>
  