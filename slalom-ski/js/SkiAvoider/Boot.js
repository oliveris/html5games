var Game = {};

Game.Boot = function(game) {

};

Game.Boot.prototype = {

	init:function() {
		
		this.input.maxPointers = 1;

		this.stage.disableVisibilityChange = true;

		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	    this.game.scale.pageAlignHorizontally = true;
	    this.game.scale.pageAlignVertically = true;
	    // this.scale.minWidth = 320;
	    // this.scale.minHeight = 480;
	    this.scale.maxWidth = 700;
	    this.scale.maxHeight = 1000;

	},

	preload:function() {

		this.load.image('preloaderBar', 'assets/images/preloader.png');

	},

	create:function() {
		
		this.state.start('Preloader');

	}

}