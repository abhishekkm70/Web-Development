var n = Math.random();
n= n*6;
var t = Math.floor(n)+1;

var randomDice = "dice"+t+".png";
var randomDiceSource= "images/"+randomDice;

var image1 =document.querySelectorAll("img")[0];
image1.setAttribute("src", randomDiceSource);


var n2= Math.floor(Math.random() *6 )+1;
var  randomDiceSource2 = "images/dice"+ n2 +".png";

var image2 = document.querySelectorAll("img")[1];
image2.setAttribute("src", randomDiceSource2);


if (t>n2)
{
  var winner =document.querySelector("h1");
  winner.innerHTML = " Player 1  wins🚩";
}
else if(n2>t)
{
  var winner =document.querySelector("h1");
  winner.innerHTML = " Player 2  wins🚩";
}
else{
  var winner =document.querySelector("h1");
  winner.innerHTML = "DRAW";
}
