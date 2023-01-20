import Phaser from 'phaser'
import FirstScene from './FirstScene'

const DEFAULT_WIDTH = 2560;
const DEFAULT_HEIGHT = 1600;

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	width: DEFAULT_WIDTH,
	height: DEFAULT_HEIGHT,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
		},
	},
	scene: [FirstScene],
}

export default new Phaser.Game(config)
