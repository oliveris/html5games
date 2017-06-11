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
    	tileSprite = this.game.add.tileSprite(0, 0, 360, 640, 'background');

		// create platform
		this.platformCreate();

		// create hero
    	this.heroCreate();

    	// create ninja star
    	this.ninjaStarCreate();

    	// draws the score live and any helper text to the screen
    	this.drawText();

    	//  Create our Timer
	    timer = this.game.time.create(false);

	    //  Set a TimerEvent to occur after 2 seconds
	    timer.loop(2000, this.updateCounter, this);

	    //  Start the timer running - this is important!
	    //  It won't start automatically, allowing you to hook it to button events and the like.
	    timer.start();

		//  This will create a new object called "cursors", inside it will contain 4 objects: up, down, left and right.
    	//  These are all Phaser.Key objects, so anything you can do with a Key object you can do with these.
    	this.cursor = this.game.input.keyboard.createCursorKeys();
	},

	/**
	 * UPDATE FUNTION
	 * executed multiple times per second - used for collision detection
	 */
	update: function() {

		// spin the ninja star
		this.ninjaStar.angle += 10;

		// hero collisions
	    this.physics.arcade.collide( this.ninja, this.platforms );

		// hero movement
		if (this.ninja.alive) {
		    this.heroMove();
		}

		// update the score
		scoreText.text = scoreString + score;

	    // ninja star collisions
	    this.physics.arcade.collide( this.ninjaStar, this.platforms);

	    // detect collision between the ninja star and the ninja 
	    this.game.physics.arcade.overlap(this.ninjaStar, this.ninja, function() {
	    	this.enemyHitsPlayer()
	    }, null, this);
	},

	updateCounter: function() {
		score++;
	},

	enemyHitsPlayer: function() {

	    if (godMode !== true) {
	    	//  decrease the lives
		    lives -= 1;
		    livesText.text = livesString + lives;
		    godMode = true;
	    }

	    this.game.time.events.add(Phaser.Timer.SECOND * 4, this.loseGodMode, this);

	    // if lives ==0
	    if (lives === 0) {
	    	stateText.text="GAME OVER\nClick to restart";
	        stateText.visible = true;

	        this.ninja.kill();

	        timer.stop();

	        //the "click to restart" handler
	        this.game.input.onTap.addOnce(this.restart,this);
	    }
	},

	loseGodMode: function() {
		godMode = false;
	},

	ninjaStarCreate: function() {
		// ninja star setup
    	this.ninjaStar = this.game.add.sprite(this.game.world.centerX, 40, 'ninjaStar');
		this.ninjaStar.anchor.setTo(0.5, 0.5);
		this.ninjaStar.scale.setTo(0.2);

		this.physics.arcade.enable( this.ninjaStar );
		this.ninjaStar.body.velocity.setTo(200,200);
    	// ninja star sprite wall collisions
    	this.ninjaStar.body.collideWorldBounds = true;
    	//  This sets the image bounce energy for the horizontal 
	    //  and vertical vectors. "1" is 100% energy return
	    this.ninjaStar.body.bounce.set(1);
	},

	platformCreate: function() {
		// platform basic setup
	    this.platforms = this.add.group();
	    this.platforms.enableBody = true;
	    this.platforms.createMultiple( 10, 'pixel' );

	    // create the base platform, with buffer on either side so that the hero doesn't fall through
	    this.platformsCreateOne( -16, this.world.height - 16, this.world.width + 16 );
	    // create a batch of platforms that start to move up the level
	    for( var i = 0; i < 9; i++ ) {
	      this.platformsCreateOne( this.rnd.integerInRange( 0, this.world.width - 50 ), this.world.height - 100 - 100 * i, 50 );
	    }
	},

	platformsCreateOne: function( x, y, width ) {
	    // this is a helper function since writing all of this out can get verbose elsewhere
	    var platform = this.platforms.getFirstDead();
	    platform.reset( x, y );
	    platform.scale.x = width;
	    platform.scale.y = 16;
	    platform.body.immovable = true;
	    return platform;
  	},

	heroCreate: function() {
	    // basic hero setup
		this.ninja = this.game.add.sprite(this.game.world.centerX, this.game.world.height - 70, 'ninja');
		this.ninja.anchor.setTo(0.5, 0.5);
		this.ninja.scale.setTo(0.5);

	    // hero collision setup
	    // disable all collisions except for down
	    this.physics.arcade.enable( this.ninja );
	    this.ninja.body.collideWorldBounds = true;
	    this.ninja.body.gravity.y = 500;
	    this.ninja.body.checkCollision.up = false;
	    // this.ninja.body.checkCollision.left = false;
	    // this.ninja.body.checkCollision.right = false;
  	},

  	heroMove: function() {
	    // handle the left and right movement of the hero
	    if( this.cursor.left.isDown ) {
	      	this.ninja.body.velocity.x = -200;
	    } else if( this.cursor.right.isDown ) {
	      	this.ninja.body.velocity.x = 200;
	    } else {
	      	this.ninja.body.velocity.x = 0;
	    }

	    // handle hero jumping
	    if( this.cursor.up.isDown && this.ninja.body.touching.down ) {
	      	this.ninja.body.velocity.y = -350;
	    } 
	    
	    // wrap world coordinated so that you can warp from left to right and right to left
	    this.world.wrap( this.ninja, this.ninja.width / 2, false );

	    // track the maximum amount that the hero has travelled
	    this.ninja.yChange = Math.max( this.ninja.yChange, Math.abs( this.ninja.y - this.ninja.yOrig ) );
	    
	    // if the hero falls below the camera view, gameover
	    if( this.ninja.y > this.cameraYMin + this.game.height && this.ninja.alive ) {
	      this.state.start( 'GameState' );
	    }
	},

	drawText: function() {
		// writing the score
    	scoreString = 'Score : ';
    	scoreText = this.game.add.text(10, 10, scoreString + score, { 
    		font: '22px Arial', 
    		fill: '#000000' 
    	});

    	//  Lives
	    livesString = 'Lives : ';
	    livesText = this.game.add.text(this.game.world.width - 100, 10, livesString + lives, { 
	    	font: '22px Arial', 
	    	fill: '#000000' 
	    });

	    //  Text
	    stateText = this.game.add.text(this.game.world.centerX,this.game.world.centerY,' ', { 
	    	font: '32px Arial', 
	    	fill: '#ffffff' 
	    });
	    stateText.anchor.setTo(0.5, 0.5);
	    stateText.visible = false;
	},

	restart: function() {
	    // reset the text and variables
	    lives = 3;
	    score = 0;
	    livesText.text = livesString + lives;
	    scoreText.text = scoreString + score;

	    //revives the player
	    this.ninja.revive();
	    //hides the text
	    stateText.visible = false;
	}

};