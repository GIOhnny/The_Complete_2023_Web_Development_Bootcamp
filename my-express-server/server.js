const express = require("express")

const app = express()
const port = 3000

 app.get('/', function (req, res) {
   console.log(req);
    res.send("<h1>Hello World!</h1>");
 });


 app.get('/contact', function (req, res) {
    res.send("Contact me at giohnny@gmail.com");
 });

app.get('/about', function (req, res) {
    res.send("bla bla bla bla<br> Contact me at giohnny@gmail.com");
 });

app.get('/hobbies', function (req, res) {
    res.send("<ul><li>Code</li><li>Games</li><li>Soccer</li></ul>");
 });


app.listen(port , function () {
    console.log("Server started on port " + port);
});

