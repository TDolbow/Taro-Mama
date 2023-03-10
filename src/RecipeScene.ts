import Phaser from 'phaser'
import main from './main';

export default class RecipeScene extends Phaser.Scene {
	constructor() {
		super('recipe-scene')
	}
preload() {
    this.load.image("kitchen", "assets/backgrounds/titlescene/background.jpg");
    this.load.image("recipeText", "assets/backgrounds/recipeScene/recipeText.png");
    this.load.image("musubiText", "assets/backgrounds/recipeScene/spam-musubi.png");
    this.load.image('exit', 'assets/buttons/exit.png');
}
create() {
    //kitchen background
		const scaledKicthen = this.add.image(400, 300, "kitchen"); //1280 800
		scaledKicthen.displayWidth = Number(main.config.width);
		scaledKicthen.displayHeight = Number(main.config.height);

    //recipe text
        const scaledRecipe = this.add.image(400, 100, "recipeText");
        scaledRecipe.displayWidth = Number(main.config.width) * .5;
		scaledRecipe.scaleY = scaledRecipe.scaleX;

    //span musubi recipe
        //this.add.ellipse(400, 200, 0xffffff);
        const scaledMusubi = this.add.image(400, 200, "musubiText");
        scaledMusubi.displayWidth = Number(main.config.width) * .5;
        scaledMusubi.scaleY = scaledMusubi.scaleX;
        scaledMusubi.setInteractive({ useHandCursor: true });
        scaledMusubi.on('pointerdown', () => this.clickMusubi());

    //back button
        const back = this.add.image(50, 550, "exit");
        back.scale = 0.1
        back.setInteractive({ useHandCursor: true });
        back.on('pointerdown', () => this.clickBack());

}
clickMusubi() {
    this.scene.switch("musubi-scene");
}
clickBack() {
    this.scene.switch("title-scene");
}
}