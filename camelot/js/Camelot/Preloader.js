Game.Preloader = function(game) {

	this.preloadBar = null;

};

Game.Preloader.prototype = {

	preload:function() {

		this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloaderBar');

		this.preloadBar.anchor.setTo(0.5, 0.5);

		this.time.advancedTiming = true;

		this.load.setPreloadSprite(this.preloadBar);

		// LOAD ALL ASSETS FOR START SCREEN

		this.load.image('playBtn', 'assets/images/play-btn.png');

		this.load.image('startBackground', 'assets/images/start-background.jpg');

		// LOAD ALL ASSETS FOR GAME STATE

		// load the game background
		// this.load.image('gameBackground', 'assets/images/game-background.jpg');

		// load the player sprite
		// this.load.image('player', 'assets/images/player.png');

		// load the flag sprite
		// this.load.image('flag', 'assets/images/flag.png');

		// load the trees
		// this.load.image('tree', 'assets/images/tree.png');

	},

	create:function() {

		// this.state.start('StartScreen');

	}

}