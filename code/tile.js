var tiles  = [];
var tileWidth = 64;

function Tile(x,y){
  this.x = x;
  this.y = y;
  this.width = tileWidth;
  this.xPos = this.x*this.width
  this.yPos = this.y*this.width
  this.border = 3;
  this.borderscaler = 2;
  this.affinity;
  this.linkedUnit;
}

Tile.prototype.setAffinity = function(mapY){
  if(mapY <= (goodTerritory-1) && mapY > (neutralTerritory-1)) this.affinity = angels;
  if(mapY <= neutralTerritory-1 && mapY > (evilTerritory-1)) this.affinity = null;
  if(mapY <= (evilTerritory-1)) this.affinity = demons;
  if(mapY < 0 || mapY > goodTerritory) console.log("value not within parametres");
}


Tile.prototype.getAffinityColour = function () {
  if(this.affinity==angels) return "rgb(23, 203, 176)";
  if(this.affinity==null) return "rgb(20, 194, 27)";
  if(this.affinity==demons) return "rgb(190, 19, 19)";
}

Tile.prototype.render = function () {
  if(this.affinity==angels) angelTilespr.render(this.x*tileWidth,this.y*tileWidth)
  if(this.affinity==null) neutralTilespr.render(this.x*tileWidth,this.y*tileWidth)
  if(this.affinity==demons) demonTilespr.render(this.x*tileWidth,this.y*tileWidth)
  // c.fillStyle = this.getAffinityColour();
  // c.fillRect(this.x*tileWidth,this.y*tileWidth,this.width,this.width);
  if(this == selectedTile) this.renderBorder("rgb(19, 19, 19)");
  if(this.linkedUnit!=null && this.linkedUnit == selectedUnit) this.renderBorder("rgb(194, 175, 6)");
  if(this.linkedUnit!=null && this.linkedUnit == selectedUnit && gameMode==3) this.renderBorder("rgb(197, 207, 10)");


  // if(gameMode ==1 && this==selectedTile){
  //   c.beginPath();
  //   c.lineWidth = this.border;
  //   c.strokeStyle = "rgb(19, 19, 19)";
  //   c.rect(this.xPos+this.border*this.borderscaler,this.yPos+this.border*this.borderscaler,this.width-this.border*this.borderscaler*2,this.width-this.border*this.borderscaler*2);
  //   c.stroke();
  //   this.renderTileInfo();
  // }
  // if(this.linkedUnit!=null) if(gameMode==2 && this.linkedUnit==selectedUnit){
  //   c.beginPath();
  //   c.lineWidth = this.border;
  //   c.strokeStyle = "rgb(211, 215, 14)";
  //   c.rect(this.xPos+this.border*this.borderscaler,this.yPos+this.border*this.borderscaler,this.width-this.border*this.borderscaler*2,this.width-this.border*this.borderscaler*2);
  //   c.stroke();
  //   this.renderTileInfo();
  // }
}


Tile.prototype.renderBorder = function(colour){
  c.beginPath();
  c.lineWidth = this.border;
  c.strokeStyle = colour;
  c.rect(this.xPos+this.border*this.borderscaler,this.yPos+this.border*this.borderscaler,this.width-this.border*this.borderscaler*2,this.width-this.border*this.borderscaler*2);
  c.stroke();
  this.renderTileInfo();
}


Tile.prototype.pickSelectedColour = function(){
  if(this.linkedUnit!=null){
    if(this.linkedUnit==selectedUnit){
      return "rgb(211, 215, 14)";
      console.log('selected a clour')
    }
  } else return "rgb(19, 19, 19)";
}

Tile.prototype.renderTileInfo = function(){
  c.font = "16px Arial";
  c.fillStyle = "rgb(45, 45, 45)";
  var x = canvas.width/2;
  var y = 50;
  var width = canvas.width/3;
  var height = canvas.height/2
  c.fillRect(x,y,width,height);
  c.fillStyle = "rgb(186, 226, 225)"
  if(this.linkedUnit != null){
    c.fillText("Linked Unit: "+this.linkedUnit.name+"",x+10,y+20);
  }else c.fillText("Linked Unit: No Unit",x+10,y+20);
  if(this.affinity == angels) c.fillText("Tile Affinity: Angelic",x+10,y+40);
  if(this.affinity == null) c.fillText("Tile Affinity: Neutral",x+10,y+40);
  if(this.affinity == demons) c.fillText("Tile Affinity: Demonic",x+10,y+40);
}




var selectedTile;

function testIfOccupied(){
  for(var mapY = 0; mapY < map.length; mapY++){
    for(var mapX = 0; mapX < map[mapY].length; mapX++){
      map[mapY][mapX].linkedUnit = null;
      for(var a = 0; a < angels.length; a++){
        if(angels[a].x==mapX && angels[a].y==mapY){
          map[mapY][mapX].linkedUnit = angels[a];
          angels[a].linkedTile = map[mapY][mapX];
          map[mapY][mapX].affinity = angels[a].affinity;
        }
      }
      for(var d = 0; d < demons.length; d++){
        if(demons[d].x==mapX && demons[d].y==mapY){
          map[mapY][mapX].linkedUnit = demons[d];
          demons[d].linkedTile = map[mapY][mapX];
          map[mapY][mapX].affinity = demons[d].affinity;
        }
      }
    }
  }
}
