var keys = [];

document.body.addEventListener('keydown', function (e) {
	keys[e.keyCode] = true;
})

document.body.addEventListener('keyup', function (e) {
	keys[e.keyCode] = false;
})

function keyInput(){
  if(keys[49]){
    changeGameMode(1);
  }
  if(keys[50]){
    changeGameMode(2);
  }
  if(keys[51]){
    changeGameMode(3);
  }
}

function changeGameMode(x){
	gameMode = x;
	selectedUnit = null;
	selectedTile = null;
}
