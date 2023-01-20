import Phaser from 'phaser'
import main from './main';

export default class TitleScene extends Phaser.Scene {
	// FOR POPUP 
	popup_button: Phaser.GameObjects.Image;
	centerX:number = 300;
    centerY:number =300;

	
	constructor() {
		super('title-scene')
	}

	preload() {
		//preload here
		this.load.image("kitchen", "assets/backgrounds/TitleBackground.jpg");
		this.load.image("title", "assets/backgrounds/titleText.png")
	}

	create() {
		//create here
		const scaledKicthen = this.add.image(1280, 800, "kitchen");
		scaledKicthen.displayWidth = Number(main.config.width);
		scaledKicthen.scaleY = scaledKicthen.scaleX;
		const scaledTitle = this.add.image(1280, 350, "title");
		scaledTitle.displayWidth = Number(main.config.width) * .8;
		scaledTitle.scaleY = scaledTitle.scaleX;

		// FOR POPUP
		this.popup_button = this.add.image(this.centerX, this.centerY, 'popup-bttn-up');
        this.popup_button.setInteractive();

		// on popup button clicked

		this.popup_button.on('pointerup',(event: MouseEvent) => {
            // Jump to another scene...
            this.scene.start('popupScene');
        });
	}
}
