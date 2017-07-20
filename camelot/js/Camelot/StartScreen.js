Game.StartScreen = function(game){};

Game.StartScreen.prototype = {

	/**
	 * Create function
	 */
	create: function() {

		// creates the start button
		this.createStartBtn();

		// create the instruction button
		this.createInstructionsBtn();

		// create the game logo
		this.createGameLogo();

    	// listen for the click on the start button
    	this.startBtn.events.onInputDown.add(this.doStartBtn, this);

    	// listen for the click on the instructions button
    	this.instructionBtn.events.onInputDown.add(this.doInstructionBtn, this);

	},

	createStartBtn: function() {
		// basic start button setup
		this.startBtn = this.game.add.sprite(this.game.world.centerX + 270, this.game.world.height - 200, 'startBtn');
		this.startBtn.anchor.setTo(0.5, 0.5);
		this.startBtn.scale.setTo(0.7);

		//  Enables all kind of input actions on this image (click, etc)
    	this.startBtn.inputEnabled = true;
	},

	createInstructionsBtn: function() {
		// basic button setup
		this.instructionBtn = this.game.add.sprite(this.game.world.centerX - 270, this.game.world.height - 200, 'instructionsBtn');
		this.instructionBtn.anchor.setTo(0.5, 0.5);
		this.instructionBtn.scale.setTo(0.7);

		//  Enables all kind of input actions on this image (click, etc)
    	this.instructionBtn.inputEnabled = true;
	},

	createGameLogo: function() {
		// basic button setup
		this.gameLogo = this.game.add.sprite(this.game.world.centerX, 400, 'gameLogo');
		this.gameLogo.anchor.setTo(0.5, 0.5);
		this.gameLogo.scale.setTo(1.5);

		//  Enables all kind of input actions on this image (click, etc)
    	this.gameLogo.inputEnabled = true;
	},

	doStartBtn: function() {

		this.state.start('GameState');

	},

	doInstructionBtn: function() {

		// might change this to a pop up rather than create a new screen for this
		this.state.start('Instructions');

	}

};