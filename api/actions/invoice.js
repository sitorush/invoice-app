const { ObjectID } = require('mongodb');

const db = require('../helper/db').default;
const clientCollection = db('client');
const invoiceCollection = db('invoice');

const getInvoice = function (req, params) {
  return invoiceCollection.find(req).then(
    (invoices) => Promise.resolve(invoices),
    (ex) => {
      console.error(ex);
      return Promise.reject(ex);
    });
}

const postInvoice = function (req) {
  if (req.body._id) { // EDIT
    req.body._id = ObjectID(req.body._id);
  }

  return clientCollection.find(req, req.body.client)
    .then((client) => {
      if (!client.invNumber) {
        client.invNumber = 0;
      }

      client.invNumber++;

      req.body.invNumber = client.invNumber;
      return clientCollection.save(req, client);
    })
    .then(() => invoiceCollection.save(req))
    .then(() => Promise.resolve(), (ex) => {
      console.error(ex);
      return Promise.reject(ex);
    });
}

const deleteInvoice = function (req) {
  return invoiceCollection.remove(req).then(
    (result) => Promise.resolve(result),
    (ex) => {
      console.error(ex);
      return Promise.reject(ex);
    });
}

exports.default = function load(...args) {
  const [req] = args;
  switch (req.method) {
    case 'GET':
      return getInvoice(...args);
    case 'POST':
      return postInvoice(...args);
    case 'DELETE':
      return deleteInvoice(...args);
    default:
      return Promise.reject({ status: 404 });
  }
}
