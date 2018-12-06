const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./models/db.json');
const db = low(adapter);
const uuidv4 = require('uuid/v4');

const isNotValid = data => {
  return !!!data.name || !!!data.age;
};

module.exports.gets = function() {
  return new Promise((resolve, reject) => {
    try {
      const cats = db.get('cats').value();
      resolve(cats);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports.getById = function(paramsId) {
  return new Promise((resolve, reject) => {
    try {
      const cats = db
        .get(`cats`)
        .find({ id: paramsId })
        .value();
      resolve(cats);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports.add = function(data) {
  return new Promise((resolve, reject) => {
    if (isNotValid(data)) {
      reject(new Error('Data format is not correct'));
    }
    let id = uuidv4();
    const cat = {
      name: data.name,
      age: parseInt(data.age),
    };
    data = Object.assign({}, { id }, cat);
    db.get('cats')
      .push(data)
      .write();
    resolve(data);
  });
};

module.exports.update = function(data, paramsId) {
  return new Promise((resolve, reject) => {
    if (isNotValid(data)) {
      reject(new Error('Data format is not correct'));
    }

    const cat = {
      name: data.name,
      age: parseInt(data.age),
    };

    const record = db
      .get('cats')
      .find({ id: paramsId })
      .value();

    if (!!record) {
      const result = db
        .get('cats')
        .find({ id: paramsId })
        .assign(cat)
        .value();

      db.write();
      resolve(result);
    } else {
      reject(new Error('Not found'));
    }
  });
};

module.exports.delete = function(paramsId) {
  return new Promise((resolve, reject) => {
    const result = db
      .get('cats')
      .remove({ id: paramsId })
      .write();

    resolve(result[0]);
  });
};
