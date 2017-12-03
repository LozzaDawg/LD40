
function Unit(x,y,sprite,affinity,name,fclass){
  this.x = x;
  this.y = y;
  this.sprite = sprite;
  this.linkedTile;
  this.affinity = affinity;
  this.name = name;
  this.class = fclass;
  affinity.push(this);
  units.push(this);
}

Unit.prototype.render = function () {
  this.sprite.render(this.x*tileWidth,this.y*tileWidth);

};

Unit.prototype.update = function(){
  if(gameMode==3 && this.class == fClass.goodMelee && this==selectedUnit) this.aimSwordAttack();
}


Unit.prototype.withinCastRange = function(x,y){
  var r = 2;
  return (Math.abs(this.x-x) < r && Math.abs(this.y-y) < r)
}

Unit.prototype.move = function(x,y){
  this.x = x;
  this.y = y;
  testIfOccupied();
}

var aimTiles = [];
function clearAimTiles(){
  aimTiles = [];
}

Unit.prototype.aimSwordAttack = function(x,y){
  for(var i = 1; i < 3; i++){
    leftx = this.x-i;
    lefty = this.y-i;
    righty = this.y-i;
    rightx = this.x+i;
    if(leftx<0)leftx=null;
    if(rightx>map[0].length-1)rightx=null;
    if(lefty<0)lefty=null;
    if(righty<0)righty=null;
    //if(leftx>=0 || bothy>=0 || rightx<map.length || bothy>=0) {;
    //if(leftx==null || rightx==null || lefty==null) continue;
    //}
    if(lefty!=null && leftx!=null) map[lefty][leftx].renderBorder("rgb(4, 34, 191)")
    if(righty!=null && rightx!=null) map[righty][rightx].renderBorder("rgb(4, 34, 191)")
    if(map[lefty][leftx].linkedUnit.affinity==angels)continue
    if(map[righty][rightx].linkedUnit.affinity==angels)continue
    aimTiles.push(map[lefty][leftx]);
    aimTiles.push(map[righty][rightx]);
    console.log("is swording")
  }
}


var selectedUnit;

function renderUnits(){
  for(var i = 0; i < angels.length; i++){
    angels[i].render();
  }
  for(var i = 0; i < demons.length; i++){
    demons[i].render();
  }
}

function updateUnits(){
  for(var i = 0; i < angels.length; i++){
    angels[i].update();
  }
  // for(var i = 0; i < demons.length; i++){
  //   demons[i].render();
  // }
}
