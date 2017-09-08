const db = require('../helper/db').default;
const clientCollection = db('clients');

const getClient = function (req) {
  return clientCollection.findAll(req)
}

const saveClient = function (req) {
  if (!req.body._id) {
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

const findClient = function (req, params) {
  return clientCollection.findOne(req, params[0])
}

exports.default = function (...args) {
  const [req, params] = args;

  switch (req.method) {
    case 'GET':
      if (params.length > 0) { // get one 
        return findClient(...args);
      } else {
        return getClient(...args);
      }
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
