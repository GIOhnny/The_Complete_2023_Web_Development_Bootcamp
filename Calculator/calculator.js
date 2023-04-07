const express = require("express")
const bodyParser = require("body-parser");

const app = express()
const port = 3000
app.use(bodyParser.urlencoded({extended: true}));

 app.get('/', function (req, res) {
   //console.log(__dirname );
   res.sendFile(__dirname+"/index.html");
 });

 app.get('/bmicalculator', function (req, res) {
    //console.log(__dirname );
    res.sendFile(__dirname+"/bmicalculator.html");
  });

app.post('/', function (req, res) {
    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);
        
    res.send("Result = "+(num1+num2));
});

app.post('/bmicalculator', function (req, res) {
    var weight = parseFloat(req.body.weight);
    var height = parseFloat(req.body.height);
    
    /* console.log(req.body);
     console.log(req.body.weight);
     console.log(req.body.height);*/

    var bmi = weight / (height * height);
    res.send("Yourg BMI is = "+ bmi);
});

app.listen(port , function () {
    console.log("Server started on port " + port);
});

