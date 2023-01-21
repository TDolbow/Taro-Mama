import Phaser from 'phaser'
import main from './main';

export default class FirstScene extends Phaser.Scene {
   
    back_button: Phaser.GameObjects.Image;

	constructor() {
		super('spam-scene')
	}
preload() {
    this.load.image("button", "assets/buttons/button.jpg")
}
create() {
    this.add.text(200, 300, "spam");
    
    this.back_button = this.add.image(100, 50, "button");
		
	this.back_button.on('pointerup',(event: MouseEvent) => {
        this.scene.start('firstScene');
    });
}
}