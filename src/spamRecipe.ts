import Phaser from 'phaser'
import main from './main';

export default class spamRecipe extends Phaser.Scene {
   
    back_button?: Phaser.GameObjects.Image;

	constructor() {
		super('spam-scene')
	}
    preload() {
        //this.load.image("button", "assets/buttons/button.png")
        this.load.image("button2", "assets/buttons/recipeBook.jpg")
        this.load.image('list', 'assets/backgrounds/firstscene/ingredientList.png');
    }
    create() {
        //background
        const scaledList = this.add.image(400, 300, "list");
        scaledList.displayWidth = Number(main.config.width) * 1.5;
        scaledList.displayHeight = Number(main.config.width);
        
        //this.back_button = this.add.image(100, 50, "button");
        //this.back_button.setInteractive({ useHandCursor: true });

        this.back_button = this.add.image(50, 100, "button2").setScale(.1);
        this.back_button.setInteractive({ useHandCursor: true });
        this.back_button.on('pointerdown',() => {
            this.scene.switch('musubi-scene');
        });

        //recipe text
        const title = this.add.text(180, 100, "SPAM MUSUBI", { color: '0xFF0000', fontSize: '58px'})
        title.scale = 1.2;
        this.add.text(150, 200,"step 1:",  { color: '0xFF0000', fontStyle: 'bold'});
        this.add.text(180, 220, "slice spam", { color: '0xFF0000', fontStyle: 'bold'});
        this.add.text(150, 240,"step 2:",  { color: '0xFF0000', fontStyle: 'bold'});
        this.add.text(180, 260, "cook spam", { color: '0xFF0000', fontStyle: 'bold'});  
        this.add.text(150, 280,"step 3:",  { color: '0xFF0000', fontStyle: 'bold'});
        this.add.text(180, 300, "add rice to musubi mold and press down", { color: '0xFF0000', fontStyle: 'bold'}); 
        this.add.text(150, 320,"step 4:",  { color: '0xFF0000', fontStyle: 'bold'});
        this.add.text(180, 340, "remove the rice from the mold", { color: '0xFF0000', fontStyle: 'bold'});
        this.add.text(150, 360,"step 5:",  { color: '0xFF0000', fontStyle: 'bold'});
        this.add.text(180, 380, "add a slice of cooked spam to the top of the rice", { color: '0xFF0000', fontStyle: 'bold'});
        this.add.text(150, 400,"step 6:",  { color: '0xFF0000', fontStyle: 'bold'});
        this.add.text(180, 420, "wrap the nori around the spam and rice", { color: '0xFF0000', fontStyle: 'bold'});
    }
}