Game.GameState = function(game){};

var playerDirection = 'start';

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

    	// create first set of flags
    	this.flagsGroupCreate();

    	//  Create our Timer
	    timer = this.game.time.create(false);

	    //  Set a TimerEvent to occur after 2 seconds
	    timer.loop(4000, this.flagsCreate, this);

	    //  Start the timer running - this is important!
	    //  It won't start automatically, allowing you to hook it to button events and the like.
	    timer.start();

	    // create hero
    	this.heroCreate();
	},

	/**
	 * UPDATE FUNTION
	 * executed multiple times per second - used for collision detection
	 */
	update: function() {
		// detect when the mouse is clicked down
		this.game.input.onDown.add(this.doPlayerMovement, this);

		// flags group movement
		var i;    
		for (i = 0; i < this.flagGroup.length; i++)     
		{ 
			this.flagGroup['children'][i].y -= 1;
		}
	},

	heroCreate: function() {
	    // basic hero setup
		this.player = this.game.add.sprite(this.game.world.centerX, 175, 'player');
		this.player.anchor.setTo(0.5, 0.5);
		this.player.scale.setTo(1);

	    // hero collision setup
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

  	flagsGroupCreate: function() {
    	//  Here we create the group
    	this.flagGroup = this.game.add.group();
    	this.physics.arcade.enable( this.flagGroup );
  	},

  	flagsCreate: function() {
  		// this.flagCreateOne(0, this.player.x, this.player.y + 500);
    	this.getRandomPositionX();

    	// need to work out the best position for the second flag
    	this.getSecondPositionX();

    	// create the flags
    	this.pointsX = [
    		this.randX,
    		this.secondX
    	];

  		for (var i = 0; i < this.pointsX.length; i++) {
		    this.flagGroup.create(this.pointsX[i], this.game.world.height, 'flag');
		}

		// remove old flags if past a certain point
    	this.destroyOldFlags();
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
  	},

	destroyOldFlags: function() {
		var i;    
		for (i = 0; i < this.flagGroup.length; i++)     
		{        
			if (this.flagGroup['children'][i].y < 0) {
				this.flagGroup['children'][i].destroy();
				console.log('flag destroyed');
			}
			if (this.flagGroup['children'][i].y < 0) {
				this.flagGroup['children'][i].destroy();
				console.log('flag destroyed');
			}
			console.log(this.flagGroup['children'][i].y);
		}
	}  	

};