'use strict';

const ObjectID = require('mongodb').ObjectID;
const invoiceCollectionName = 'invoices';

module.exports = {
    save, find, remove
};

function save(req) {
    const db = req.app.get('database');

    return new Promise(function(resolve, reject) {
        db.collection(invoiceCollectionName).save(req.body, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(null);
        });
    });
}

function find(req) {
    const db = req.app.get('database');
    let params = null;

    try {
        params = _getIdParam(req);
    } catch(e) {
        console.error(e);
        return Promise.reject('Invalid invoice ID format being passed.')
    }

    return new Promise(function(resolve, reject) {
        db.collection(invoiceCollectionName).find(params).toArray(function(err, results) {
            if (err) {
                reject(err);
            }

            if (results.length > 0 && params) {
                resolve(results[0]);
            } else if (results.length === 0 && params) {
                reject('Unable to find an invoice');
            } else if (results.length > 0) {
                resolve(results);
            } else {
                resolve([])
            }
        });
    });
}

function remove(req) {
    const db = req.app.get('database');
    return db.collection(invoiceCollectionName).remove(_getIdParam(req), 1).then(_ => {
        // reset id to get everything
        req.params.id = null;
        return find(req);
    })
}

function _getIdParam(req) {
    let params = null;

    if (req.params.id) {
        params = {
            "_id": ObjectID(req.params.id)
        };
    }

    return params;
}
