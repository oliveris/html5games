Game.GameState = function(game){};

var lives = 3;
var livesString = '';
var livesText;

var score = 0;
var scoreString = '';
var scoreText;

var stateText;
var godMode = false;

// define the game state
Game.GameState.prototype = {

	/**
	 * CREATE FUNCTION
	 * executed after everything is loaded
	 */
	create: function() {

		// this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.physics.startSystem( Phaser.Physics.ARCADE );

		// create a tiled sprite background
    	tileSprite = this.game.add.tileSprite(0, 0, 700, 1000, 'gameBackground');

		// create hero
    	this.heroCreate();
	},

	/**
	 * UPDATE FUNTION
	 * executed multiple times per second - used for collision detection
	 */
	update: function() {

	},

	heroCreate: function() {
	    // basic hero setup
		this.player = this.game.add.sprite(this.game.world.centerX, 175, 'player');
		this.player.anchor.setTo(0.5, 0.5);
		this.player.scale.setTo(1);

	    // hero collision setup
	    // disable all collisions except for down
	    // this.physics.arcade.enable( this.player );
	    // this.player.body.collideWorldBounds = true;
	    // this.player.body.gravity.y = 500;
	    // this.player.body.checkCollision.up = false;
	    // this.player.body.checkCollision.left = false;
	    // this.player.body.checkCollision.right = false;
  	},

};