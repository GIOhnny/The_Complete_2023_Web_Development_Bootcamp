//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//Config for local
// const MongoDB_connection_string= "mongodb://127.0.0.1:27017/todolistDB";
//  (async function connectToMongoDB() {
//    try {
//      await mongoose.connect(MongoDB_connection_string);    
//    }
//    catch (e) {
//      console.log('MongoDB database connection error: ' + e.message);
//    }
//  })();


//Config for Cloud
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://giohnny:NHxPeK0yqXDvsHux@cluster0.f2mfd6v.mongodb.net/todolistDB?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

async function run() {
    // Connect to the MongoDB cluster
    try {
      await mongoose.connect(uri);    
    }
    catch (e) {
      console.log('MongoDB database connection error: ' + e.message);
    } 

}

run().catch(console.dir);

const itemsSchema = new mongoose.Schema({
  name: String  
});

const listSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema]
});

const Item = mongoose.model('item', itemsSchema);
const List = mongoose.model('list', listSchema);

 const item1 = new Item ({
     name: "item1"
 });

const item2 = new Item ({
    name: "item2"
});

const item3 = new Item ({
    name: "item3"
});

const defaultItems = [item1, item2, item3];


  async function getAllItems() {
     //console.log("getAllItems");
     const items = await Item.find({})    
     //console.log("getAllItems: " + JSON.stringify(items));
     return items;
 };

 async function insertDefaultItems() {
    //console.log("insert default Items");
    await Item.insertMany(defaultItems)
    .catch(function (err) {
      console.log(err);
    });
 };
    

app.get("/", async function(req, res) {
    const items = await getAllItems();
    //console.log("items: " + JSON.stringify(items));
    if (items.length === 0) {
      await insertDefaultItems();      
      res.redirect("/");
    } else {
      //console.log("Before render items" + items.length + " " +JSON.stringify(items));
      res.render("list", {listTitle: "Today", newListItems: items})     
    }
});

app.post("/", async function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;
  
  const item = new Item({
    name: itemName
  });
  
  if (listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    await List.findOne({ name: listName }).exec()
    .then(async function (list) {
      list.items.push(item);
      await list.save();
      res.redirect("/"+listName);
    });
  }
});

app.post("/delete", async function(req, res){
   const checkedItemId = req.body.checkbox;
   console.log("Checked itemId: " + checkedItemId);
   await Item.findByIdAndDelete(checkedItemId);
   res.redirect("/");
});

app.get('/:customListName', async function (req, res) {
  const customListName = req.params.customListName;

  await List.findOne({name: customListName}).exec()
  .then (async function (list) {
    //console.log("Then function " + list);
    if (list === null )  {
      const newlist = new List({
        name: customListName,
        items: defaultItems
      });
      await newlist.save();
      res.redirect("/" + customListName);
       } else {       
        //console.log("exists");        
        res.render("list",{listTitle: list.name, newListItems: list.items});
       }
  });
});

// app.get("/work", function(req,res){
//   res.render("list", {listTitle: "Work List", newListItems: workItems});
// });

// app.get("/about", function(req, res){
//   res.render("about");
// });

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
