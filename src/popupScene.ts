import Phaser from 'phaser'
import main from './main';

export default class popupScene extends Phaser.Scene {

    back_button: Phaser.GameObjects.Image;

    constructor() {
		super('popup-scene')
		
	}

	preload() {
		
		this.load.image("background", "assets\popup\white_background.jpg");
		this.load.image("button", "assets\popup\button.jpg")
	}

	create() {
		this.back_button = this.add.image(100, 50, "button");
		
		this.back_button.on('pointerup',(event: MouseEvent) => {
            this.scene.start('TitleScene');
        });
	}
    

}