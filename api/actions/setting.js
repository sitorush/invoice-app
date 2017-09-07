const { ObjectID } = require('mongodb');

const getSetting = function (req) {
  const db = req.app.get('database');

  return new Promise((resolve, reject) => {
    db.collection('settings').find().toArray(function (err, results) {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

const postSetting = function (req) {
  const db = req.app.get('database');

  if (req.body._id) {
    req.body._id = objectId(req.body._id);
  }

  db.collection('settings').save(req.body, (err, result) => {
    if (err) {
      return Promise.reject(err);
    }

    return db.collection('settings').find().toArray(function (err, results) {
      return Promise.resolve(results[0] || []);
    });
  });
}

exports.default = function load(...args) {
  const [req] = args;
  switch (req.method) {
    case 'GET':
      return getSetting(...args);
    case 'POST':
      return postSetting(...args);
    default:
      return Promise.reject({ status: 404 });
  }
}
