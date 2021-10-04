//jshint eversion:6
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req, res){

  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);


  var  result = num1 + num2;

  res.send("The result is "+ result);
});
// for BMI Calculator page
app.get("/bmicalculator", function(req,res){
  res.sendFile(__dirname+ "/bmiCalculator.html");
});

app.post("/bmicalculator", function(req,res){
  var height = Number(req.body.height);
  var weight = Number(req.body.weight);

  var bmi = weight/(height*height);

  res.send("Your BMI is "+bmi);
});
app.listen(3000);
