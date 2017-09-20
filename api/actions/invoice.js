const { ObjectID } = require('mongodb');

const db = require('../helper/db').default;
const clientCollection = db('clients');
const invoiceCollection = db('invoices');

const getInvoice = function (req, params) {
  return invoiceCollection.findAll(req).then(
    (invoices) => Promise.resolve(invoices),
    (ex) => {
      console.error(ex);
      return Promise.reject(ex);
    });
}

const postInvoice = function (req) {
  // check client last invoice number
  return clientCollection.findOne(req, req.body.client._id)
    .then(
      (client) => {
        if (!client.invNumber) {
          client.invNumber = 0;
        }
        client.invNumber++;
        return clientCollection.save(req, client);
      }
    )
    .then(
      (client) => {
        invoiceCollection.save(req, {
          invoiceItems: req.body.invoiceItems,
          client: client,
          _id: ObjectID(req.body._id)
        })
      }
    )
    .then(
      () => Promise.resolve((res) => res.status(204).json()), 
      (ex) => {
        console.error(ex);
        return Promise.reject(ex);
      }
    );
}

const deleteInvoice = function (req) {
  return invoiceCollection.remove(req).then(
    (result) => Promise.resolve(result),
    (ex) => {
      console.error(ex);
      return Promise.reject(ex);
    });
}

const findInvoice = function (req, params) {
  return invoiceCollection.findOne(req, params[0])
}

exports.default = function load(...args) {
  const [req, params] = args;
  switch (req.method) {
    case 'GET':
      if (params.length > 0) {
        return findInvoice(...args);
      } else {
        return getInvoice(...args);
      }
    case 'POST':
    case 'PUT':
      return postInvoice(...args);
    case 'DELETE':
      return deleteInvoice(...args);
    default:
      return Promise.reject({ status: 404 });
  }
}
