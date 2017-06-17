Game.GameState = function(game){};

var playerDirection = 'start';

var score = 0;
var scoreString = '';
var scoreText;

var lives = 3;
var livesString = '';
var liveText;

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

    	// create first set of flags
    	this.flagsGroupCreate();

    	// create the tree group
    	this.treesGroupCreate();

    	//  Create our Timer
	    timer = this.game.time.create(false);

	    //  Set a TimerEvent to occur after 2 seconds
	    timer.loop(5000, this.flagsCreate, this);

	    //  Start the timer running - this is important!
	    //  It won't start automatically, allowing you to hook it to button events and the like.
	    timer.start();

	    // write the distance travelled and live on the game
	    this.drawText();
	},

	/**
	 * UPDATE FUNTION
	 * executed multiple times per second - used for collision detection
	 */
	update: function() {
		// detect when the mouse is clicked down
		this.game.input.onDown.add(this.doPlayerMovement, this);

		// flags group movement
		this.doFlagsMovement();

		// tree group movement
		this.doTreesMovement();

		// detect collision between the ninja star and the ninja 
	    // this.game.physics.arcade.overlap(this.treeGroup, this.player, function() {
	    // 	this.enemyHitsPlayer()
	    // }, null, this);
	    if (this.game.physics.arcade.collide(this.player, this.treeGroup, this.enemyHitsPlayer, this.processHandler, this))
	    {
	        console.log('boom');
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

  	doFlagsMovement: function() {
  		var i;    
		for (i = 0; i < this.flagGroup.length; i++)     
		{ 
			this.flagGroup['children'][i].y -= 2;
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

    	// adds flags to the flag group
  		for (var i = 0; i < this.pointsX.length; i++) {
		    this.flagGroup.create(this.pointsX[i], this.game.world.height, 'flag');
		}

		// work out position for the trees
		this.getTreePosition();
		// test if tree position came back as an array or not
		if (Array.isArray(this.treePosition)) {
			// console.log('Tree position is array');
			for (var i = 0; i < this.treePosition.length; i++) {
			    this.treeGroup.create(this.treePosition[i], this.game.world.height, 'tree');
			}
		} else {
			// console.log('Tree position is not an array');
			this.treeGroup.create(this.treePosition, this.game.world.height, 'tree');
		}

		// remove old flags if past a certain point
    	this.destroyOldFlags();

    	// rmove old trees if past a certain point
    	this.destroyOldTrees();
  	},

  	getRandomPositionX: function() {
  		this.randX = Math.floor(Math.random() * this.world.width - 50) + 50;
  	},

  	getSecondPositionX: function() {
		// need to work out if the randx is closer to the left or the right
  		if (this.randX < this.game.world.centerX) {
  			// if closer to the left we + 100
  			this.secondX = this.randX + 300;
  		} else if (this.randX > this.game.world.centerX) {
  			this.secondX = this.randX - 300;
  		} else {
  			this.secondX = this.randX - 300;
  		}
  	},

  	doTreesMovement: function() {
  		var i;    
		for (i = 0; i < this.treeGroup.length; i++)     
		{ 
			this.treeGroup['children'][i].y -= 2;
		}
  	},

  	treesGroupCreate: function() {
    	//  Here we create the group
    	this.treeGroup = this.game.add.group();
    	// this.physics.arcade.enable( this.treeGroup );
    	this.treeGroup = this.game.add.physicsGroup();
  	},

  	getTreePosition: function() {
  		if (this.randX < 300) {
  			// if the first random point falls to the left we create a tree to the right of the second point
  			this.treePosition = this.secondX + 50;
  		} else if (this.randX > (this.world.width - 300)) {
  			// if the first random point falls to the right we create a tree to the left of the second point
  			this.treePosition = this.secondX - 150;
  		} else if (this.randX > 300 && this.randX < this.game.world.centerX) {
  			// if the tree falls roughly in the middle we create 2 trees
  			this.treePosition = [
  				this.randX - 150,
  				this.secondX + 50
  			];
  		} else if (this.randX < (this.world.width - 300) && this.randX > this.game.world.centerX) {
  			// if the tree falls roughly in the middle we create 2 trees
  			this.treePosition = [
  				this.randX + 50,
  				this.secondX - 150
  			];
  		}
  		// console.log('Tree pos: ' + this.treePosition);
  		// console.log('1st random X: ' + this.randX);
  		// console.log('2nd random X: ' + this.secondX);
  	},

	destroyOldFlags: function() {
		var i;    
		for (i = 0; i < this.flagGroup.length; i++)     
		{        
			if (this.flagGroup['children'][i].y <= 50) {
				this.flagGroup['children'][i].destroy();
				// console.log('flag destroyed');
			}
			if (this.flagGroup['children'][i].y <= 50) {
				this.flagGroup['children'][i].destroy();
				// console.log('flag destroyed');
			}
			// console.log(this.flagGroup['children'][i].y);
		}
	},

	destroyOldTrees: function() {
		var i;    
		for (i = 0; i < this.treeGroup.length; i++)     
		{        
			if (this.treeGroup['children'][i].y <= 50) {
				this.treeGroup['children'][i].destroy();
				// console.log('tree destroyed');
			}
			if (this.treeGroup['children'][i].y <= 50) {
				this.treeGroup['children'][i].destroy();
				// console.log('tree destroyed');
			}
			// console.log(this.treeGroup['children'][i].y);
		}
	},

	drawText: function() {
		// writing the score
    	scoreString = 'Distance Traveled : ';
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
	},

	enemyHitsPlayer: function(player, tree) {

		tree.kill();

	    if (godMode !== true) {
	    	//  decrease the lives
		    lives -= 1;
		    livesText.text = livesString + lives;
		    godMode = true;
	    }

	    this.game.time.events.add(Phaser.Timer.SECOND * 4, this.loseGodMode, this);

	    // if lives ==0
	    if (lives === 0) {
	    	// go to the game over screen
	    }
	},

	loseGodMode: function() {
		godMode = false;
	},

	processHandler: function() {
		return true;
	}

};