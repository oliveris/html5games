Game.Preloader = function(game) {

	this.preloadBar = null;

};

Game.Preloader.prototype = {

	preload:function() {

		this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloaderBar');

		this.preloadBar.anchor.setTo(0.5, 0.5);

		this.time.advancedTiming = true;

		this.load.setPreloadSprite(this.preloadBar);

		// LOAD ALL ASSETS

		// when loading an image you need to state an image key and path tot he image
		this.load.image('background', 'assets/images/background2.jpg');

		// load the ninja
		this.load.image('ninja', 'assets/images/ninja.png');

		// add the ninja star
		this.load.image('ninjaStar', 'assets/images/ninja-star.png');

		this.load.image( 'pixel', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/836/pixel_1.png' );

	},

	create:function() {

		this.state.start('GameState');

	}

}