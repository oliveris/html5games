Game.StartScreen = function(game){};

Game.StartScreen.prototype = {

	/**
	 * Create function
	 */
	create: function() {

		// create a tiled sprite background
    	tileSprite = this.game.add.tileSprite(0, 0, 360, 640, 'background');

    	// basic start button setup
		this.startBtn = this.game.add.sprite(this.game.world.centerX, this.game.world.height - 100, 'playBtn');
		this.startBtn.anchor.setTo(0.5, 0.5);
		this.startBtn.scale.setTo(0.4);

		//  Enables all kind of input actions on this image (click, etc)
    	this.startBtn.inputEnabled = true;

    	// listen for the click
    	this.startBtn.events.onInputDown.add(this.doStartBtn, this);

	},

	doStartBtn: function() {

		this.state.start('GameState');

	},




};