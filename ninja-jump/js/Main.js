

window.onload = function() {
	// initiate the Phaser framework
	// var game = new Phaser.Game(640, 360, Phaser.AUTO);
	var game = new Phaser.Game( 360, 640, Phaser.CANVAS, 'game-container' );

	// add the boot
	game.state.add('Boot', Game.Boot);

	// add the preloader
	game.state.add('Preloader', Game.Preloader);

	// add the start screen
	game.state.add('StartScreen', Game.StartScreen);

	// add the game
	game.state.add('GameState', Game.GameState);

	// launch the game
	game.state.start('Boot');
}



// game.state.start('GameState');

