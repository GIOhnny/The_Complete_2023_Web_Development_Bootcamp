const { MongoClient } = require('mongodb');
// Connection URI
const uri = 'mongodb://127.0.0.1:27017/';
// Create a new MongoClient
const client = new MongoClient(uri);
async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Establish and verify connection
    await client.db('fruitsDB').command({ ping: 1 });
    console.log('Connected successfully to server');
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

// const url='mongodb://127.0.0.1:27017/?directConnection=true';
// const dbName='fruitsDB';

// const client = new MongoClient(url, {useNewUrlParser: true});

// client.connect(function(err) {
//     assert.equal(null,err);
//     console.log("Connected successfully to server!");
//     const db = client.db(dbName);
//     client.close();
// });