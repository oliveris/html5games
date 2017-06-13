Game.GameState = function(game){};

var playerDirection = 'start';
var flags;

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

    	// this.flagCreateOne(0, this.player.x, this.player.y + 500);
    	this.getRandomPositionX();
    	console.log(this.randX);

    	// need to work out the best position for the second flag
    	this.getSecondPositionX();
    	console.log(this.secondX);

    	// create the flags
    	this.pointsX = [
    		this.randX,
    		this.secondX
    	];
    	this.flagsCreate(this.pointsX);
	},

	/**
	 * UPDATE FUNTION
	 * executed multiple times per second - used for collision detection
	 */
	update: function() {

		// detect when the mouse is clicked down
		this.game.input.onDown.add(this.doPlayerMovement, this);

	},

	heroCreate: function() {
	    // basic hero setup
		this.player = this.game.add.sprite(this.game.world.centerX, 175, 'player');
		this.player.anchor.setTo(0.5, 0.5);
		this.player.scale.setTo(1);

	    // hero collision setup
	    // disable all collisions except for down
	    this.physics.arcade.enable( this.player );
	    this.player.body.collideWorldBounds = true;
	    // this.player.body.gravity.y = 500;
	    // this.player.body.checkCollision.up = false;
	    // this.player.body.checkCollision.left = false;
	    // this.player.body.checkCollision.right = false;
  	},

  	doPlayerMovement: function() {
  		// check the direction status
		if (playerDirection == 'start') {
			this.player.body.velocity.x = -300;
			playerDirection = 'left';
		} else if (playerDirection == 'left') {
			this.player.body.velocity.x = 300;
			this.player.scale.setTo(-1, 1);
			playerDirection = 'right';
		} else if (playerDirection == 'right') {
			this.player.body.velocity.x = -300;
			this.player.scale.setTo(1, 1);
			playerDirection = 'left';
		}
  	},

  	flagsCreate: function(points) {

  		for (var i = 0; i < points.length; i++) {
		    // flag basic set up
	  		this.flag = this.game.add.sprite(points[i], this.world.width - 100, 'flag');
			this.flag.anchor.setTo(0.5, 0.5);
			this.flag.scale.setTo(1);

			this.physics.arcade.enable( this.flag );
	    	this.flag.body.collideWorldBounds = true;
			this.flag.body.velocity.y = - 200;
		}

  		// flag basic set up
  // 		this.flag = this.game.add.sprite(x, y, 'flag');
		// this.flag.anchor.setTo(0.5, 0.5);
		// this.flag.scale.setTo(1);

		// this.game.physics.enable(this.flag, Phaser.Physics.ARCADE)
		// this.flag.body.immovable = true;
		// this.flag.body.collideWorldBounds = true;

		// this.flagTween = this.game.add.tween(this.flag).to({
		// 	y: this.flag.y + 25
		// }, 2000, 'Linear', true, 0, 100, true);
  	},

  	getRandomPositionX: function() {
  		this.randX = Math.floor(Math.random() * this.world.width) + 0;
  	},

  	getSecondPositionX: function() {
		// need to work out if the randx is closer to the left or the right
  		if (this.randX < this.game.world.centerX) {
  			// if closer to the left we + 100
  			this.secondX = this.randX + 200;
  		} else if (this.randX > this.game.world.centerX) {
  			this.secondX = this.randX - 200;
  		} else {
  			this.secondX = this.randX - 200;
  		}
  	}

};