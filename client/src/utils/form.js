import React from 'react';
import { Field } from 'redux-form';
import { required } from './validation';

export const renderInput = ({ input, label, type, meta: { error, touched } }) =>
  <div className="form-group">
    <label htmlFor="clientName">{label}</label>
    <input {...input} className="form-control" type={type} />
    {error && touched && <div className="text-danger">{error}</div>}
  </div>;

export const renderFields = (fields) =>
  fields.map((field) => <Field 
    key={field.name}
    validate={field.validate || required} 
    type={field.type || 'text'} 
    component={renderInput} 
    {...field} 
  />)