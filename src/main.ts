import Phaser from 'phaser'
import TitleScene from './TitleScene'

const DEFAULT_WIDTH = 2560; 
const DEFAULT_HEIGHT = 1600; 

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app', 
	scale: {
		mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
		width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
		},
	},
	scene: [TitleScene],
}

export default new Phaser.Game(config)
