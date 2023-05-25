const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/wikiDB")

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);


app.route("/articles")
   .get(async function (req, res) {
     await Article.find()
                  .exec()
                  .then(articles => {
                        res.send(articles);
                  })
                  .catch(err => {
                    res.status(500);
                    res.send(err.message);
                    //console.log(err);
                    //res.status(500).json({success: false})
                  }); 
    
    })
   .post(async function(req,res) {

      const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
      });

     await newArticle.save()
              .catch(err => {
                res.status(500);
                res.send(err.message);
              })
              .finally(()=> {
                res.status(200);
                res.send("Successefully added a new article.");
              })
    })
   .delete(async function(req,res) {
     await Article.deleteMany()
                 .catch(err => {
                    res.status(404);
                    res.send(err.message);
                 })
                 .finally(()=>{
                    res.status(200);
                    res.send("Successefully deleted");
                 })

    });

app.route("/articles/:articleTitle")
   .get(async function (req, res) {      
      await Article.findOne({title: req.params.articleTitle})
                   .exec()
                   .then(article => {
                         res.send(article);
                   })
                   .catch(err => {
                     res.status(500);
                     res.send(err.message);
                     //console.log(err);
                     //res.status(500).json({success: false})
                   }); 
     })
    .put(async function(req,res) {
      await Article.updateOne({title: req.params.articleTitle}, {title: req.body.title, content: req.body.content}, {overwite: true})
      .then(() => {
          res.send("Successefully updated!");
          res.status(200);})          
      .catch(err => {
          res.status(500);
          res.send(err.message);}); 
    })
    .patch(async function(req,res) {
      await Article.updateOne({title: req.params.articleTitle}, {$set: req.body})
      .then(() => {
          res.send("Successefully patched!");
          res.status(200);})          
      .catch(err => {
          res.status(500);
          res.send(err.message);}); 
    })
    .delete(async function (req, res) {      
      await Article.deleteOne({title: req.params.articleTitle})
                   .exec()
                   .then(() => {
                         res.send("Article deleted!");
                   })
                   .catch(err => {
                     res.status(500);
                     res.send(err.message);
                   }); 
     });

app.listen(3000, function() {
  console.log("Server started on port 3000");
});