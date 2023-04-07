const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB")

const fruitSchema = new mongoose.Schema({
  name: {type: String, required: [true,"The fruit must have a name!" ]} ,
  rating: {type: Number, min: 1, max: 10},
  review: String
});

const Fruit = mongoose.model('fruit', fruitSchema);

/* Insert single*/ 
/*
const fruit = new Fruit({
  name: "Peach",
  rating: 10,
  review: "Peaces are yummy!"
});

fruit.save();

*/

/* Insert multiple
const kiwi = new Fruit({
  name: "Kiwi",
  score: 5,
  review: "un kiwi"
});

const lemon = new Fruit({
  name: "Lemon",
  score: 3,
  review: "o lamaie"
});


Fruit.insertMany([kiwi, lemon])
.then(function () {
  console.log("Successfully saved defult items to DB");
})
.catch(function (err) {
  console.log(err);
});
*/


/* select 
const fct_fruits = async function getAllFruits() {
  const fruits = await Fruit.find({});
  
  //diplay full array
  console.log (fruits);

  //loop trough fruits array
  fruits.forEach(fruit => {
    console.log(fruit.name);
  });

  mongoose.connection.close();
}

fct_fruits();
*/

/* update
const upd_fruits = async function updateFruit() {
  const fruit = await Fruit.updateOne({_id:"64307d79a43a8470d73b7cc4"}, {name:"Melon", review:"Melons are sweet!"});
  //diplay full array
  console.log (fruit);
  mongoose.connection.close();
}

upd_fruits();
*/

/*delete
const del_fruits = async function deleteFruit() {
  const fruit = await Fruit.deleteOne({_id:"64307d79a43a8470d73b7cc4"});
  //diplay full array
  console.log (fruit);
  mongoose.connection.close();
}

del_fruits();
*/

/* people schema */
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});

const Person = mongoose.model('Person', personSchema);

const p1 = new Person({
  name: "John",
  age: 37
});

const pineapple = new Fruit({
  name: "Pineapple",
  rating: 8,
  review: "Very good!"
});

const fruitadd = async function addFruit (Fruit) {
  await Fruit.save(Fruit);
  //mongoose.connection.close();
}

fruitadd(pineapple);


const p2 = new Person({
  name: "Amy",
  age: 12,
  favoriteFruit: pineapple
});


const person = async function addPerson (Person) {
  await Person.save(Person);
 // mongoose.connection.close();
}

person(p2);
