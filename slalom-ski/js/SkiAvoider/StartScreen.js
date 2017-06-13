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

    	// add game music
    	// music = this.game.add.audio('gameMusic');

    	// play the music
    	// music.play();

    	// listen for the click on the mutes button
    	// this.createSpeakerBtn();

    	// listen for the click on the speaker button
    	// this.speakerBtn.events.onInputDown.add(this.doSpeakerBtn, this);

	},

	// createSpeakerBtn: function() {
	// 	// basic start button setup
	// 	this.speakerBtn = this.game.add.sprite(40, 60, 'speakerBtn');
	// 	this.speakerBtn.anchor.setTo(0.5, 0.5);
	// 	this.speakerBtn.scale.setTo(0.1);

	// 	//  Enables all kind of input actions on this image (click, etc)
 //    	this.speakerBtn.inputEnabled = true;
	// },

	// doSpeakerBtn: function() {
	// 	if (musicPlaying === true) {
	// 		music.mute = true;
	// 		musicPlaying = false;
	// 	} else {
	// 		music.mute = false;
	// 		musicPlaying = true;
	// 	}
	// },

	createStartBtn: function() {
		// basic start button setup
		this.startBtn = this.game.add.sprite(this.game.world.centerX, this.game.world.height - 100, 'playBtn');
		this.startBtn.anchor.setTo(0.5, 0.5);
		this.startBtn.scale.setTo(0.4);

		//  Enables all kind of input actions on this image (click, etc)
    	this.startBtn.inputEnabled = true;
	},

	doStartBtn: function() {

		this.state.start('GameState');

	}

};