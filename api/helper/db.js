const { ObjectID } = require('mongodb');

exports.default = function (collection) {
  const collectionName = collection;

  function findAll(req) {
    const db = req.app.get('database');
  
    return new Promise(function(resolve, reject) {
      db.collection(collectionName).find().toArray(function (err, results) {
        if (err) {
          reject(err);
        }

        resolve(results);
      });
    });
  }
  
  function findOne(req, id) {
    const db = req.app.get('database');
  
    if (!id) throw new Error('Please provide valid id.');
    return db.collection(collectionName).findOne({ _id: ObjectID(id) });
  }
  
  function save(req, data) {
    const db = req.app.get('database');
    return new Promise(function(resolve, reject) {
      // use data argument if exist, or request.body as second option
      let payload = data || req.body;
      if (payload._id) {
        payload._id = ObjectID(payload._id);
      }
      db.collection(collectionName).save(payload, (err, record) => {
        if (err) {
          reject(err);
        } else {
          resolve(payload);
        }
      });
    });
  }
  
  function insertOne(req) {
    const db = req.app.get('database');
    return new Promise(function(resolve, reject) {
      db.collection(collectionName).insertOne(req.body, (err) => {
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
  
    return db.collection(collectionName).deleteOne({
      _id: ObjectID(req.body.id)
    }).then(_ => {
      // reset id to get everything
      req.params.id = null;
      return findAll(req);
    });
  }

  return {
    findOne, findAll, save, remove, insertOne
  }
}
