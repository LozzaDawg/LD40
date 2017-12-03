
function renderUI(){
  c.fillStyle = "rgb(0, 0, 0)"
  var text = "invalid gameMode";
  if(gameMode == 1) text = "View Mode";
  if(gameMode == 2) text = "Move Unit";
  if(gameMode == 3) text = "Use Ability 1";
  c.font="30px Arial"
  c.fillText(text, canvas.width/2,30);
}
