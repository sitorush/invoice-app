const { ObjectID } = require('mongodb');
const db = require('../helper/db').default;
const settingsCollection = db('settings');

const getSettings = function (req) {
  return settingsCollection.findAll(req);
}

const postSettings = function (req) {
  return settingsCollection.save(req).then(() => {
    return settingsCollection.findAll(req).then((res) => {
      return Promise.resolve(res[0] || [])
    })
  });
}

exports.default = function load(...args) {
  const [req] = args;
  switch (req.method) {
    case 'GET':
      return getSettings(...args);
    case 'POST':
      return postSettings(...args);
    default:
      return Promise.reject({ status: 404 });
  }
}
