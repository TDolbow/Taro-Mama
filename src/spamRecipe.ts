import Phaser from 'phaser'
import main from './main';

export default class spamRecipe extends Phaser.Scene {
   
    back_button?: Phaser.GameObjects.Image;

	constructor() {
		super('spam-scene')
	}
    preload() {
        this.load.image("button", "assets/buttons/button.png")
        this.load.image("button2", "assets/buttons/recipeBook.jpg")
    }
    create() {
        this.add.text(200, 300, "spam recipe TBD");;
        var click_sound = this.sound.add("clicksound", {
            volume: .3
        })
        
        //this.back_button = this.add.image(100, 50, "button");
        //this.back_button.setInteractive({ useHandCursor: true });

        this.back_button = this.add.image(50, 100, "button2").setScale(.1);
        this.back_button.setInteractive({ useHandCursor: true });
            
        this.back_button.on('pointerdown',(event: MouseEvent) => {
            click_sound.play();
            this.scene.switch('first-scene');
        });
    }
}