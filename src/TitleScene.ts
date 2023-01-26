import Phaser from 'phaser'
import main from './main';

export default class TitleScene extends Phaser.Scene {
	constructor() {
		super('title-scene')
	}

	preload() {
		//preload here
		this.load.image("kitchen", "assets/backgrounds/titlescene/background.jpg");
		this.load.image("title", "assets/backgrounds/titlescene/titleText.png");
		this.load.image("play", "assets/backgrounds/titlescene/playText.png");
		this.load.image("how", "assets/backgrounds/titlescene/howText.png");
		this.load.audio("clicksound", ["assets/sounds/mixkit-select-click-1109.wav"]);
		this.load.audio("jazz1", ["assets/sounds/mixkit-chill-bro-494.mp3"]);
		this.load.audio("completedRecipe", ["assets/sounds/mixkit-instant-win-2021.wav"]);

		//for mute button
		this.load.image('mute', 'assets/buttons/mute.png')
		//for unmute button
		this.load.image('unmute', 'assets/buttons/unmute.png')
		
	}

	create() {
		//jazz background
		const music1 = this.sound.add("jazz1", {
			volume: .2,
			loop: true,
		})
		music1.play();
		
		//kitchen background
		const scaledKicthen = this.add.image(400, 300, "kitchen"); //1280 800
		scaledKicthen.displayWidth = Number(main.config.width);
		scaledKicthen.displayHeight = Number(main.config.height);

		//Taro Mama title
		const scaledTitle = this.add.image(400, 150, "title"); //1280 350
		scaledTitle.displayWidth = Number(main.config.width) * .8;
		scaledTitle.scaleY = scaledTitle.scaleX;

		//play button
		const scaledPlay = this.add.image(400, 300, "play"); //1280 800
		scaledPlay.displayWidth = Number(main.config.width) * .2;
		scaledPlay.scaleY = scaledPlay.scaleX;
        scaledPlay.setInteractive({ useHandCursor: true });
        scaledPlay.on('pointerdown', () => this.clickPlay());

		//how to play
		const scaledHow = this.add.image(400, 400, "how"); //1280 1200
		scaledHow.displayWidth = Number(main.config.width) * .4;
		scaledHow.scaleY = scaledPlay.scaleX;
        scaledHow.setInteractive({ useHandCursor: true });
        scaledHow.on('pointerdown', () => this.clickHow());

		// -------------------------------- MUTE BUTTON --------------------------------

		const muteBtn = this.add.image(700,550, 'mute');
		muteBtn.scale = .05
		muteBtn.setInteractive()

		//on mute button pushed
		muteBtn.on('pointerdown', (event: MouseEvent) => {
			music1.pause()
				  
		});
		// -------------------------------- END MUTE BUTTON --------------------------------

		// -------------------------------- UNMUTE BUTTON --------------------------------

		const unmuteBtn = this.add.image(750,550, 'unmute');
		unmuteBtn.scale = .05
		unmuteBtn.setInteractive()

		//on mute button pushed
		unmuteBtn.on('pointerdown', (event: MouseEvent) => {
			music1.play()
	
		});
		// -------------------------------- END UNMUTE BUTTON --------------------------------

	} // end create function	
		clickPlay() {
			this.scene.switch("recipe-scene");
		}
		clickHow() {
			this.scene.switch("instr-scene");
		}
}