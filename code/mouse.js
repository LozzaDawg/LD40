function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

var mousePos
var canClick = true
var left = 0
var right = 2

canvas.addEventListener('mousemove', function(evt) {
  mousePos = getMousePos(canvas, evt);
});

function stopClickforABit(){
  canClick = false
  setTimeout(startclickagain,50)
}
function startclickagain(){
  canClick = true
}

function pointWithinBoxFromSeperatePoints(entity,entityx,entityy){
	return(entityx < entity.xPos + entity.width &&
	entityx > entity.xPos &&
	entityy < entity.yPos + entity.width &&
	entityy > entity.yPos)
}

canvas.addEventListener('mouseup', function(evt) {
  if(canClick == true){
    if(evt.button === left){

      for(var i = 0; i < tiles.length; i++){
        if(pointWithinBoxFromSeperatePoints(tiles[i],mousePos.x,mousePos.y)){
          selectedTile = tiles[i];
        }
      }

    }
    if(evt.button === right){

    }
  }
});

function testIfOccupied(){
  for(var t = 0; t<tiles.length;t++){
    for(var a = 0; a<tiles.length;a++){
      if(tiles[t].x==angels[a].x && tiles[t].y==angels[a].y){
        tiles[t].linkedUnit = angels[a];
        angels[a].linkedTile = tiles[t];
      }else{
        tiles[t].linkedUnit = null;
        angels[a].linkedTile = null;
      }
    }
    for(var d = 0; d<tiles.length;d++){
      if(tiles[t].x==demons[d].x && tiles[t].y==demons[d].y){
        tiles[t].linkedUnit = demons[d];
        demons[d].linkedTile = tiles[t];
      } else{
        tiles[t].linkedUnit = null;
        demons[d].linkedTile = null;
      }
    }
  }
}
