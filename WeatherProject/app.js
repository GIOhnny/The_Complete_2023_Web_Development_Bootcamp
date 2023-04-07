const express = require('express');
const app = express();

const https = require('https');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', (req, res) => {
   res.sendFile(__dirname + "/index.html");
});

app.post('/', (req, res) => {
    const query = req.body.cityName;
    const apiKey = "63af8590e34afac2cfdebd27998f602f"
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units;

    https.get(url, (response) => {

        response.on("data", function (data){
        const weatherData = JSON.parse(data);            
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
       
        res.write("<p>Temperature in " +query + " is " + temp + " Celsius </p>");
        res.write("<h1>"+description+"</h1>");
        res.write("<img src="+imageUrl+">");

        res.send();
        });
    });
});

app.listen(3000, function() {
console.log('listening on port 3000');
});

// https.get(url, (response) => {
// console.log(response.statusCode);

// response.on("data", function (data){
//     const weatherData = JSON.parse(data);            
//     console.log(weatherData);
//     const temp = weatherData.main.temp;
//     console.log(temp);
//     const description = weatherData.weather[0].description;
//     console.log(description);
//     const icon = weatherData.weather[0].icon;
//     const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"

//     res.write("<p>Temperature in Otopeni is " + temp + " Celsius </p>");
//     res.write("<h1>"+description+"</h1>");
//     res.write("<img src="+imageUrl+">");
//     res.send();
// });
// });
//res.send("Server is up and running!");
