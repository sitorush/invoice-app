const { ObjectID } = require('mongodb');
// import clientValidation from '../../src/components/FormClient/validation';

const clientCollectionName = 'clients';

function find(req, id) {
  const db = req.app.get('database');
  let params = null;

  if (id) {
    params = {
      _id: ObjectID(id)
    };
  }

  return new Promise(function(resolve, reject) {
    db.collection(clientCollectionName).find(params).toArray(function (err, results) {
      if (err) {
        reject(err);
      }

      if (results.length > 0 && params) {
        resolve(results[0]);
      } else if (results.length > 0) {
        resolve(results);
      } else if (results.length === 0 && params) {
        reject('Unable to find a client');
      } else {
        resolve([]);
      }
    });
  });
}

function save(req) {
  const db = req.app.get('database');

  return new Promise(function(resolve, reject) {
    db.collection(clientCollectionName).save(req.body, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function insertOne(req) {
  const db = req.app.get('database');
  return new Promise(function(resolve, reject) {
    db.collection(clientCollectionName).insertOne(req.body, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function remove(req) {
  const db = req.app.get('database');


  return db.collection(clientCollectionName).deleteOne({
    _id: ObjectID(req.body.id)
  }).then(_ => {
    // reset id to get everything
    req.params.id = null;
    return find(req);
  });
}

module.exports = {
  find, save, remove, insertOne
};
