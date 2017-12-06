
function Unit(x,y,sprite,affinity,name,fclass){
  this.x = x;
  this.y = y;
  this.sprite = sprite;
  this.linkedTile;
  this.affinity = affinity;
  this.name = name;
  this.class = fclass;
  this.id = affinity.length;
  affinity.push(this);
}

Unit.prototype.render = function () {
  this.sprite.render(this.x*tileWidth,this.y*tileWidth);

};

Unit.prototype.update = function(){
  if(gameMode==3 && this==selectedUnit){
    if(this.class == fClass.goodMelee) this.aimStab();
    if(this.class == fClass.goodMagic) this.aimBeam();
  }
  if(this.class == fClass.evilMelee){
    if(map[this.y+1][this.x].linkedUnit!=null) this.enemyAttack();
  }
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
function makeNull(x){
  x = null;
}

Unit.prototype.aimStab = function(){
  aimTiles=[];
  for(var i = 1; i<3;i++){
    ypos = this.y-i;
    if(ypos < 0) ypos = null;
    if(ypos!=null){
      map[ypos][this.x].renderBorder("rgb(27, 49, 196)");
      aimTiles.push(map[ypos][this.x])
      if(map[ypos][this.x].linkedUnit!=null){
        if(map[ypos][this.x].linkedUnit.affinity==demons){
          map[ypos][this.x].renderBorder("rgb(135, 14, 156)")
        }
      }
    }
  }
}

Unit.prototype.stab = function(x,y){
  if(map[y][x].linkedUnit!=null){
    map[y][x].linkedUnit.affinity.splice(map[y][x].linkedUnit.id,1);
    console.log("Attacked "+map[y][x].linkedUnit.name);
  }else console.log("Attack missed");
  this.move(x,y);
}

Unit.prototype.aimBeam = function(){
  aimTiles=[];
  for(var i = 1; i<10;i++){
    ypos = this.y-i;
    if(ypos < 0) ypos = null;
    if(ypos!=null){
      map[ypos][this.x].renderBorder("rgb(27, 49, 196)");
      aimTiles.push(map[ypos][this.x])
      if(map[ypos][this.x].linkedUnit!=null){
        if(map[ypos][this.x].linkedUnit.affinity==demons){
          map[ypos][this.x].renderBorder("rgb(135, 14, 156)")
        }
      }
    }
  }
}

Unit.prototype.shootHolyBeam = function(aimTiles){
  for(var i=0; i < aimTiles.length;i++){
    if(aimTiles[i].linkedUnit!=null){
      aimTiles[i].linkedUnit.affinity.splice(aimTiles[i].linkedUnit.id,1)
      console.log("Beamed "+aimTiles[i].linkedUnit.name);
    }else console.log("Beam missed");

    }
  }

  Unit.prototype.enemyAttack = function(){
    attackTile = map[this.y+1][this.x];
    if(attackTile.linkedUnit!=null){
      attackTile.linkedUnit.affinity.splice(attackTile.linkedUnit.id,1);
    }
  }


//
// Unit.prototype.aimSwordAttack = function(x,y){
//   for(var i = 1; i < 3; i++){
//     leftx = this.x-i;
//     lefty = this.y-i;
//     righty = this.y-i;
//     rightx = this.x+i;
//     if(leftx<0)leftx = null;
//     if(rightx>map[0].length-1)rightx=null;
//     if(lefty<0)lefty=null;
//     if(righty<0)righty=null;
//
//     if(righty!=null && lefty != null && leftx!=null && rightx!=null){
//       if(map[righty][rightx].linkedUnit!=null){
//         if(map[righty][rightx].linkedUnit.affinity==angels){
//           righty=null;
//           rightx=null;
//         }
//       }
//       if(map[lefty][leftx].linkedUnit!=null){
//         if(map[lefty][leftx].linkedUnit.affinity==angels){
//           lefty=null;
//           leftx=null;
//         }
//       }
//     }
//
//
//     if(lefty!=null && leftx!=null) map[lefty][leftx].renderBorder("rgb(4, 34, 191)")
//     if(righty!=null && rightx!=null) map[righty][rightx].renderBorder("rgb(4, 34, 191)")
//     if(righty!=null && lefty != null && leftx!=null && rightx!=null){
//       aimTiles.push(map[lefty][leftx]);
//       aimTiles.push(map[righty][rightx]);
//
//       for(var i = 0; i < aimTiles.length; i++){
//           if(aimTiles[i].linkedUnit!= null){
//             if(aimTiles[i].linkedUnit.affinity==demons){
//             aimTiles[i].renderBorder("rgb(157, 24, 140)")
//             console.log("on a ademom")
//           }
//         }
//       }
//     }
//   }
// }


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
