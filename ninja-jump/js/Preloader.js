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

		//  Firefox doesn't support mp3 files, so use ogg
    	this.game.load.audio('gameMusic', [
    		'assets/sounds/game-music-trim.mp3', 
    		'assets/sounds/game-music-trim.ogg'
    		]
		);

		// load the speaker icon
		this.load.image('speakerBtn', 'assets/images/speaker-icon.png');

		// LOAD ALL ASSETS FOR GAME STATE

		// when loading an image you need to state an image key and path tot he image
		this.load.image('background', 'assets/images/background2.jpg');

		// load the ninja
		this.load.image('ninja', 'assets/images/ninja.png');

		// add the ninja star
		this.load.image('ninjaStar', 'assets/images/ninja-star.png');

		this.load.image( 'pixel', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/836/pixel_1.png' );

	},

	create:function() {

		this.state.start('StartScreen');
		// this.state.start('GameState');

	}

}