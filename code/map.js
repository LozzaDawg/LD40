var map = []
var evilTerritory;
var neutralTerritory;
var goodTerritory;

function generateTiles(){
  for(var mapY = 0; mapY < 6; mapY++){
    map.push([]);
    for(var mapX = 0; mapX < 5; mapX++){
      tiles.push(new Tile(mapX,mapY))
      map[mapY].push(tiles[tiles.length-1])
    }
  }
  evilTerritory = Math.ceil(map.length*(1/6));
  neutralTerritory = Math.ceil(map.length*(5/6));
  goodTerritory = Math.ceil(map.length*(6/6));
  for(var i = 0; i < tiles.length; i++){
    tiles[i].setAffinity(tiles[i].y);
  }
}

function renderMap(){
  for(var i = 0; i < tiles.length; i++){
    tiles[i].render();
  }
}
