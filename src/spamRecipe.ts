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
        //sounds
        const click_sound = this.sound.add("clicksound", {
            volume: .3
        })

        /* //background
        const scaledList = this.add.image(400, 300, "list");
        scaledList.displayWidth = Number(main.config.width) * 1.5;
        scaledList.displayHeight = Number(main.config.width); */
        
        //background
        const scaledRecipe = this.physics.add.image(630,225, 'list')
        scaledRecipe.displayWidth = Number(main.config.width) * 0.6;
        scaledRecipe.scaleY = scaledRecipe.scaleX

        //this.back_button = this.add.image(100, 50, "button");
        //this.back_button.setInteractive({ useHandCursor: true });

        this.back_button = this.add.image(50, 100, "button2").setScale(.1);
        this.back_button.setInteractive({ useHandCursor: true });
        this.back_button.on('pointerdown',() => {
            click_sound.play();
            this.scene.switch('musubi-scene');
        });

        //recipe text
        const title = this.add.text(525, 35, "SPAM MUSUBI", { color: '0xFF0000', fontSize: '50px'})
    title.scale = 0.7;
    this.add.text(500, 100,"step 1:",  { color: '0xFF0000', fontStyle: 'bold'});
    this.add.text(530, 120, "slice spam", { color: '0xFF0000', fontStyle: 'bold'});
    this.add.text(500, 140,"step 2:",  { color: '0xFF0000', fontStyle: 'bold'});
    this.add.text(530, 160, "cook spam", { color: '0xFF0000', fontStyle: 'bold'});  
    this.add.text(500, 180,"step 3:",  { color: '0xFF0000', fontStyle: 'bold'});
    this.add.text(530, 200, "add rice to musubi mold \nand press down", { color: '0xFF0000', fontStyle: 'bold'}); 
    this.add.text(500, 240,"step 4:",  { color: '0xFF0000', fontStyle: 'bold'});
    this.add.text(530, 260, "remove the rice from \nthe mold", { color: '0xFF0000', fontStyle: 'bold'});
    this.add.text(500, 300,"step 5:",  { color: '0xFF0000', fontStyle: 'bold'});
    this.add.text(530, 320, "add a slice of cooked \nspam to the top of the rice", { color: '0xFF0000', fontStyle: 'bold'});
    this.add.text(500, 360,"step 6:",  { color: '0xFF0000', fontStyle: 'bold'});
    this.add.text(530, 380, "wrap the nori around \nthe spam and rice", { color: '0xFF0000', fontStyle: 'bold'});
    }
}