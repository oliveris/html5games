Game.StartScreen = function(game){};

var music;
var musicPlaying = true;

Game.StartScreen.prototype = {

	/**
	 * Create function
	 */
	create: function() {

		// create a tiled sprite background
    	tileSprite = this.game.add.tileSprite(0, 0, 700, 1000, 'startBackground');

		this.createStartBtn();

    	// listen for the click on the start button
    	this.startBtn.events.onInputDown.add(this.doStartBtn, this);

	},

	createStartBtn: function() {
		// basic start button setup
		this.startBtn = this.game.add.sprite(this.game.world.centerX, this.game.world.height - 100, 'playBtn');
		this.startBtn.anchor.setTo(0.5, 0.5);
		this.startBtn.scale.setTo(0.8);

		//  Enables all kind of input actions on this image (click, etc)
    	this.startBtn.inputEnabled = true;
	},

	doStartBtn: function() {

		this.state.start('GameState');

	}

};