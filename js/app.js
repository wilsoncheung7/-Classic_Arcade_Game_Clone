// Enemies our player must avoid
var Enemy = function(y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.x = 0;
  this.y = y;
  this.random = Math.floor(Math.random() * 3) + 1;
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x = Math.round(this.x + (this.random + 1 * dt));
  if(this.x > 600) {
    this.x = 0;
    this.random = Math.floor(Math.random() * 3) + 1;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
  this.life = 3;
  this.score = 0;

  this.x = 200;
  this.y = 380;
  this.sprite = 'images/char-cat-girl.png';
};

Player.prototype.update = function() {
  if(this.y==0){
    this.x=200;
    this.y=380;
  }
};

Player.prototype.renderText = function () {
  ctx.fillStyle = '#DDD';
  ctx.fillRect(0, 0, 500, 48);
  ctx.font = "45px serif";
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'black';
  ctx.fillText("Score: " + this.score, 0, 46, 120);
  ctx.strokeText("Score: " + this.score, 0, 46, 120);
  ctx.fillText("life: " + this.life, 330, 46);
  ctx.strokeText("life: " + this.life, 330, 46);
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

Player.prototype.handleInput = function(keyCode) {
  if(keyCode === 'up' && this.y > 0) {
    this.y -= 70;
  }
  if(keyCode === 'down' && this.y < 400) {
    this.y += 70;
  }
  if(keyCode === 'right' && this.x < 400) {
    this.x += 100;
  }
  if(keyCode === 'left' && this.x > 0) {
    this.x -= 100;
  }
};

var Gem = function () {
  this.y = 70;
  this.x = 100 * Math.floor(Math.random() * 5);
  this.upgrade = 0;
  this.gems = ['Gem Blue', 'Gem Green','Gem Orange', 'Star'];
  this.sprite = 'images/'+this.gems[this.upgrade]+'.png';
};

Gem.prototype.update = function () {
  if(player.score === 5 || player.score === 10 || player.score === 15) {
    gem.upgrade++;
  }
  this.sprite = 'images/'+this.gems[this.upgrade]+'.png';
  this.x = 100 * Math.floor(Math.random() * 5);
};

Gem.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Heart = function () {
  this.y = 70;
  this.notVisible = true;
  this.sprite = 'images/Heart.png';
};

Heart.prototype.update = function () {
  if(this.notVisible && (player.score % player.life) % 2 && (player.score > player.life)) {
    this.notVisible = false;
    this.x = 100 * Math.floor(Math.random() * 5);
  }
};

Heart.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Water = function(){
  this.y = 70;
  this.sprite ='images/water-block.png';
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var heart = new Heart();
var gem = new Gem();
var player = new Player();
var allEnemies = [new Enemy(70), new Enemy(140), new Enemy(210)];
var water = new Water();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
