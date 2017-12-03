function Sprite(width,height,image){
  this.width = width;
  this.hight = height;
  this.image = image;
}

Sprite.prototype.render = function (x,y) {
  c.drawImage(this.image,x,y);
}

var angel1spr = new Sprite(64,64,angel1img);
var angel2spr = new Sprite(64,64,angel2img);
var demon1spr = new Sprite(64,64,demon1img);
var demon2spr = new Sprite(64,64,demon2img);
