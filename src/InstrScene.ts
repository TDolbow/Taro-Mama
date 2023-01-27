import Phaser from 'phaser'
import main from './main';

export default class InstrScene extends Phaser.Scene {
	constructor() {
		super('instr-scene')
	}
preload() {
    //preload here
    this.load.image('list', 'public/assets/backgrounds/firstscene/ingredientList.png')
}
create() {
    //background

    const scaledRecipe = this.physics.add.image(400,225, 'list')
    scaledRecipe.displayWidth = Number(main.config.width) * 1.2;
    scaledRecipe.scaleY = scaledRecipe.scaleX

    //create here
    this.add.text(100, 200, "Welcome to Taro Mama!\nYou will cook a traditional Hawaiian meal by following \na recipe. Each level will progess in difficulty: \n\nFirst level - drag and drop the picture ingredients together\nSecond level - drag the ingredient intructions in order \nThird level - correctly order the pseudocode to create the dish.", {
        color: '0x000000',
        align: "center"
    });

    const back = this.add.text(10, 500, "Back", {
        fontSize: '40px',
        color: '0xFF0000'
        });
      back.setTint(0xFF0000);
      back.displayWidth = Number(main.config.width) * .1;
      back.scaleY = back.scaleX;
      back.setInteractive({ useHandCursor: true });
      back.on('pointerdown', () => this.clickBack());
    
}

clickBack() {
    this.scene.switch("title-scene");
}

}