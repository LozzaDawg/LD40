var canvas = document.getElementById("canvas");
canvas.width = 800;
canvas.height = 600;
var c = canvas.getContext("2d");

var units = [];
var angels = [];
var demons = [];
var mage = new Unit(1,5,angel1spr,angels,"Mage");
var pyro = new Unit(3,2,demon1spr,demons,"Pyromancer");



generateTiles();
testIfOccupied2();
setInterval(updoot,200);

function updoot(){
  c.clearRect(0,0,canvas.width,canvas.height);
  renderMap();
  renderUnits();
}
