// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
// // Connection URI
// const url = 'mongodb://127.0.0.1:27017/';
// const dbName = 'fruitsDB';

// // Create a new MongoClient
// const client = new MongoClient(url);
// client.connect(function (err){
//     assert.equal(null , err);
//     console.log('Connected successfully to server');

//     const db = client.db(dbName);

//     client(close);

// });

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

    const database = client.db('fruitsDB');//creates database if not exists  
    const collection = database.collection('fruits');//creates collection if not exists

    //creates the data
    await collection.insertMany([
        {
            _id:1,
            name:"mango",
            price:32
        },
        {
            _id:2,
            name:"apple",
            price:12,
        },
        {
            _id:3,
            name:"coconut",
            price:5
        }
    ]);
    
    //for loop to print the data
    for (let i = 1; i <= 3; i++) {
        field = await collection.findOne({_id:i});
        console.log(field);
    }

    f = await collection.findOne();
    console.log(f);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);