const mongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = 'mongodb://root:567234@ds121965.mlab.com:21965/it651';

const isNotValid = data => {
  return !!!data.name || !!!data.age;
};

module.exports.gets = function () {
  return new Promise((resolve, reject) => {
    mongoClient.connect(
      url,
      {
        useNewUrlParser: true,
      },
      (err, db) => {
        if (err) {
          reject(err);
        }
        db.db()
          .collection('cats')
          .find()
          .toArray((err, results) => {
            if (err) {
              reject(err);
            }
            db.close();
            resolve(results);
          });
      }
    );
  });
};

module.exports.getById = function (paramsId) {
  return new Promise((resolve, reject) => {
    const id = new ObjectID(paramsId);
    mongoClient.connect(
      url,
      {
        useNewUrlParser: true,
      },
      (err, db) => {
        if (err) {
          reject(err);
        }
        db.db()
          .collection('cats')
          .find({ _id: id })
          .toArray((err, result) => {
            if (err) {
              reject(err);
            }
            db.close();
            resolve(result[0]);
          });
      }
    );
  });
};

module.exports.add = function (data) {
  return new Promise((resolve, reject) => {
    if (isNotValid(data)) {
      reject('Data format is not correct');
    }
    const cat = {
      name: data.name,
      age: parseInt(data.age),
    };
    mongoClient.connect(
      url,
      {
        useNewUrlParser: true,
      },
      (err, db) => {
        if (err) {
          reject(err);
        }
        db.db()
          .collection('cats')
          .insertOne(cat, (err, result) => {
            if (err) {
              reject(err);
            }
            db.close();
            resolve(result.ops[0]);
          });
      }
    );
  });
};

module.exports.update = function (data, paramsId) {
  return new Promise((resolve, reject) => {
    const id = new ObjectID(paramsId);

    if (isNotValid(data)) {
      reject('Data format is not correct');
    }
    const cat = {
      name: data.name,
      age: parseInt(data.age),
    };
    mongoClient.connect(
      url,
      {
        useNewUrlParser: true,
      },
      (err, db) => {
        if (err) {
          reject(err);
        }
        db
          .db()
          .collection('cats')
          .findOneAndUpdate({
            _id: id
          }, {
              $set: cat
            }, {
              returnOriginal: false
            }, (err, result) => {
              if (err) {
                reject(err)
              }
              db.close()
              if (result) {
                resolve(result.value)
              }
            })
      }
    );
  });
};

module.exports.delete = function (paramsId) {
  return new Promise((resolve, reject) => {
    const id = new ObjectID(paramsId);
    mongoClient.connect(
      url,
      {
        useNewUrlParser: true,
      },
      (err, db) => {
        if (err) {
          reject(err);
        }
        db.db()
          .collection('cats')
          .deleteOne(
            {
              _id: id,
            },
            (err, result) => {
              if (err) {
                reject(err);
              }
              db.close();
              if (result.result.n === 0) {
                resolve(null);
              } else {
                resolve({ result: 'The cat was delete' });
              }
            }
          );
      }
    );
  });
};
