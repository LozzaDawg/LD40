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
  c.fillStyle = this.getAffinityColour();
  c.fillRect(this.xPos,this.yPos,this.width,this.width);
  if(this==selectedTile){
    c.beginPath();
    c.lineWidth = this.border;
    c.strokeStyle = this.pickSelectedColour();
    c.rect(this.xPos+this.border*this.borderscaler,this.yPos+this.border*this.borderscaler,this.width-this.border*this.borderscaler*2,this.width-this.border*this.borderscaler*2);
    c.stroke();
    this.renderTileInfo();
  }
}

Tile.prototype.pickSelectedColour = function(){
  if(this.linkedUnit!=null){
    if(this.linkedUnit.affinity==angels) return "rgb(211, 215, 14)";
    if(this.linkedUnit.affinity==demons) return "rgb(122, 25, 167)";
  } else return "rgb(19, 19, 19)";
}

Tile.prototype.renderTileInfo = function(){
  c.fillStyle = "rgb(45, 45, 45)";
  var x = canvas.width/2;
  var y = 50;
  var width = canvas.width/3;
  var height = canvas.height/2
  c.fillRect(x,y,width,height);
  c.fillStyle = "rgb(186, 226, 225)"
  if(this.linkedUnit != null){
    c.fillText("Linked Uniit: "+this.linkedUnit.name+"",x+10,y+20);
  }else c.fillText("Linked Uniit: No Unit",x+10,y+20);
  if(this.affinity == angels) c.fillText("Tile Affinity: Angelic",x+10,y+40);
  if(this.affinity == null) c.fillText("Tile Affinity: Neutral",x+10,y+40);
  if(this.affinity == demons) c.fillText("Tile Affinity: Demonic",x+10,y+40);
}




var selectedTile;

function testIfOccupied2(){
  for(var mapY = 0; mapY < map.length; mapY++){
    for(var mapX = 0; mapX < map[mapY].length; mapX++){
      map[mapY][mapX].linkedUnit = null;
      for(var a = 0; a < units.length; a++){
        if(units[a].x==mapX && units[a].y==mapY){
          map[mapY][mapX].linkedUnit = units[a];
          units[a].linkedTile = map[mapY][mapX];
          map[mapY][mapX].affinity = units[a].affinity;
        }
      }
    }
  }
}

function testIfOccupied(){
  for(var t = 0; t<tiles.length;t++){
    for(var a = 0; a<angels.length;a++){
      if(tiles[t].x==angels[a].x && tiles[t].y==angels[a].y){
        tiles[t].linkedUnit = angels[a];
        angels[a].linkedTile = tiles[t];
      }else{
        tiles[t].linkedUnit = null;
        angels[a].linkedTile = null;
      }
    }
    for(var d = 0; d<demons.length;d++){
      if(tiles[t].x==demons[d].x && tiles[t].y==demons[d].y){
        tiles[t].linkedUnit = demons[d];
        demons[d].linkedTile = tiles[t];
      } else{
        tiles[t].linkedUnit = null;
        demons[d].linkedTile = null;
      }
    }
  }
  testAffinity();
}

function testAffinity(){
  if(this.linkedUnit!=null){
    this.affinity = this.linkedUnit.affinity;
  }
}
