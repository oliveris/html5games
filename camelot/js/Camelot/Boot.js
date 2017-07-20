var Game = {};

Game.Boot = function(game) {

};

Game.Boot.prototype = {

	init:function() {
		
		this.input.maxPointers = 1;

		// set the canvas background to Camelots grey
		this.stage.backgroundColor = '#f4f3f1';

		this.stage.disableVisibilityChange = true;

		// reponsiveness of the game
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	    this.game.scale.pageAlignHorizontally = true;
	    this.game.scale.pageAlignVertically = true;
	    // this.scale.minWidth = 320;
	    // this.scale.minHeight = 480;
	    this.scale.maxWidth = 1000;
	    this.scale.maxHeight = 1000;

	},

	preload:function() {

		// load the pre loader assets
		this.load.image('preloaderBar', 'assets/images/preloader.png');

	},

	create:function() {
		
		// go to the preloader room
		this.state.start('Preloader');

	}

}