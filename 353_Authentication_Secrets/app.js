require('dotenv').config();
//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
//1// const encrypt = require('mongoose-encryption');
//2// const md5 = require('md5');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

//MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/userDB")

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

//1// userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ["password"]});

const User = new mongoose.model("User", userSchema);

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    await User.findOne({email: username})
                  .exec()
                  .then(founduser => {
                    bcrypt.compare(password, founduser.password, function (err, result) {
                        if (result === true) {
                            res.render("secrets");
                        }
                        else {
                          res.send("Wrong password!");
                      }
                    })                         
                    })
                  .catch(err => {
                    console.log(err);                   
                  }); 
});


app.get('/register', (req, res) => {
    res.render('register');    
});

app.post("/register", async (req, res) => {
   await bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    const newUser = new User({
      email: req.body.username,
      password: hash
      //2// password: md5(req.body.password)
     });
     newUser.save()
     .catch(err => {
      console.log(err);
     })
     .finally(()=> {
       res.render("secrets");
     })
  
   })
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});

