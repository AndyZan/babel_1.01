var MongoClient = require('mongodb').MongoClient;
var aphorisms = require('./aphorisms');

var url = 'mongodb://localhost:27000/aphorisms';

MongoClient.connect(url, function(connectError, db) {
  if (connectError) throw new Error(connectError);

  console.log("Connected correctly to server");

  var collection = db.collection('aphorisms');

  collection.insertMany(aphorisms, function(insertError, result) {
    if (insertError) throw  new Error(insertError);

    console.log('Insertion is completed');
    db.close();
  });
});
