const { json } = require("express");
const express = require("express");
const { futimesSync } = require("fs");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const city = req.body.cityName;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=61695f716d5db757dcb92bd057dc1ce7&units=metric";
  https.get(url, function (response) {
    //console.log(response);
    response.on("data", function (data) {
      const temperature = JSON.parse(data).main.temp;
      const weatherDiscription = JSON.parse(data).weather[0].description;
      const icon = JSON.parse(data).weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      console.log(temperature);
      console.log(weatherDiscription);
      // res.write(
      //   "<h1>the temperature in " +
      //     city +
      //     " is " +
      //     temperature +
      //     " Degree Celcius.</h1>"
      // );
      // res.write("<p>the weather is currently " + weatherDiscription + " .</p>");
      // res.write("<img src= " + imageURL + ">");
      // res.send();
      res.render("weather", {
        city: city,
        temperature: temperature,
        weatherDiscription: weatherDiscription,
        imageURL: imageURL,
      });
    });
  });
});

app.listen(3000, function (req, res) {
  console.log("SErver is running");
});
