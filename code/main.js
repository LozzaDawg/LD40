var canvas = document.getElementById("canvas");
canvas.width = 800;
canvas.height = 600;
var c = canvas.getContext("2d");

var units = [];
var angels = [];
var demons = [];
fClass = {
  goodMelee:0,
  goodMagic:1,
  goodRanged:2,

  evilMelee:3,
  evilMagic:4,
  evilRanged:5
}
new Unit(2,5,angel1spr,angels,"Mage");
new Unit(1,5,angel2spr,angels,"Gladiator",fClass.goodMelee);
new Unit(3,5,angel2spr,angels,"Gladiator",fClass.goodMelee);
new Unit(2,0,demon1spr,demons,"Pyromancer");
new Unit(3,0,demon2spr,demons,"Executioner");
new Unit(1,0,demon2spr,demons,"Executioner");
var gameMode = 1;

// 1 = click around
// 2 = move entities
// 3 = ability 1
// 4 = ability 2
// 5 = ability 3

generateTiles();
testIfOccupied();
setInterval(updoot,20);

function updoot(){
  c.clearRect(0,0,canvas.width,canvas.height);
  keyInput();
  renderUI();
  renderMap();
  renderUnits();
  updateUnits();
}
