const { ObjectID } = require('mongodb');
const clientCollection = require('../helper/clientCollection');

const getClient = function (req) {
  return clientCollection.find(req, req.query.id).then(
    (results) => Promise.resolve(results),
    (ex) => Promise.reject(ex));
}

const saveClient = function (req) {
  if (req.body._id) {
    req.body._id = ObjectID(req.body._id);
  } else {
    req.body.invNumber = 0;
  }
  // TODO validate here
  return clientCollection.save(req).then(
    () => Promise.resolve((res) => res.status(204).json()),
    (ex) => Promise.reject(ex));
}

const insertOne = function (req) {
  // TODO validate here
  return clientCollection.insertOne(req).then(
    () => Promise.resolve((res) => res.status(204).json()),
    (ex) => Promise.reject(ex));
}

const deleteClient = function (req) {
  return clientCollection.remove(req).then(
    (result) => Promise.resolve(result),
    (ex) => Promise.reject(ex));
}

exports.default = function (...args) {
  const [req] = args;
  switch (req.method) {
    case 'GET':
      return getClient(...args);
    case 'PUT':
      return saveClient(...args);
    case 'POST':
      return insertOne(...args);
    case 'DELETE':
      return deleteClient(...args);
    default:
      return Promise.reject({ status: 404 });
  }
}
