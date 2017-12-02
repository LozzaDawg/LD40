
function Unit(x,y,sprite,affinity,name){
  this.x = x;
  this.y = y;
  this.xPos = this.x*tileWidth;
  this.yPos = this.y*tileWidth;
  this.sprite = sprite;
  this.linkedTile;
  this.affinity = affinity;
  this.name = name;
  affinity.push(this);
  units.push(this);
}

Unit.prototype.render = function () {
  this.sprite.render(this.xPos,this.yPos);
};

function renderUnits(){
  for(var i = 0; i < angels.length; i++){
    angels[i].render();
  }
  for(var i = 0; i < demons.length; i++){
    demons[i].render();
  }
}
