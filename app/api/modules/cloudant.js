const Cloudant = require('cloudant');
const cloudant = Cloudant({url:process.env.CLOUDANT_URL});

exports.insert = function(user_id, input, response, context, timestamp) {
  return new Promise((resolve, reject) => {
    // insert to Cloudant
    const doc = {
      "user_id" : user_id,
      "input": input,
      "response": response,
      "context": context,
      "timestamp": timestamp
    };
    if(!mydb) {
      console.log("No database.");
      reject("No database.");
    }
    // insert the username as a document
    mydb.insert(doc, function(err, body, header) {
      if (err) {
        console.log(err);
        console.log('[mydb.insert] ', err.message);
        reject(err.message);
      }
      resolve(body);
    });
  });
};

exports.find = function (user_id) {
  return new Promise((resolve, reject) => {
    const query = {
      selector:{
        user_id: user_id
      },
      sort: [
        {
          "timestamp": "desc"
        }
      ]
    };
    mydb.find(query, function(err, result) {
      if (err) {
        console.log('[mydb.find] ', err);
        reject(err);
      }
      resolve(result);
    });
  });
};

const dbName = 'mydb';

cloudant.db.create(dbName, function(err, data) {
  if(!err) //err if database doesn't already exists
    console.log("Created database: " + dbName);
});

const mydb = cloudant.db.use(dbName);
