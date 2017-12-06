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
        if(gameMode==1){
          if(pointWithinBoxFromSeperatePoints(tiles[i],mousePos.x,mousePos.y)){
            if(selectedTile==tiles[i]){
              selectedTile = null;
            }else selectedTile = tiles[i];
          }

        }else if(gameMode == 2){

          if(pointWithinBoxFromSeperatePoints(tiles[i],mousePos.x,mousePos.y)){
            if(tiles[i].linkedUnit!=null && tiles[i].linkedUnit.affinity==angels){
                if(selectedUnit==tiles[i].linkedUnit){
                 selectedUnit=null;
               }else selectedUnit = tiles[i].linkedUnit;
            }else if(selectedUnit!=null && tiles[i].linkedUnit==null){
              if(selectedUnit.withinCastRange(tiles[i].x,tiles[i].y)) selectedUnit.move(tiles[i].x,tiles[i].y);
            }
          }

        }else if(gameMode == 3){
          if(pointWithinBoxFromSeperatePoints(tiles[i],mousePos.x,mousePos.y)){
            if(tiles[i].linkedUnit!=null && tiles[i].linkedUnit.affinity==angels){
                if(selectedUnit==tiles[i].linkedUnit){
                 selectedUnit=null;
               }else{
                 selectedUnit = tiles[i].linkedUnit;
                 clearAimTiles();
               }
            }else if(selectedUnit!=null && tiles[i].linkedUnit==null){
              // if(selectedUnit.withinCastRange(tiles[i].x,tiles[i].y)) selectedUnit.move(tiles[i].x,tiles[i].y);
            }
          }
          for(var j = 0; j < aimTiles.length;j++){
            if(pointWithinBoxFromSeperatePoints(aimTiles[j],mousePos.x,mousePos.y)){

              // switch (selectedUnit.class){
              //   case fClass.goodMelee:
              //     break;
              //   case fClass.goodMagic:
              //     break;
              // }

              if(selectedUnit.class==fClass.goodMelee) selectedUnit.stab(aimTiles[j].x,aimTiles[j].y);
              if(selectedUnit.class==fClass.goodMagic) selectedUnit.shootHolyBeam(aimTiles);
              return;
              break;
            }
          }
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
