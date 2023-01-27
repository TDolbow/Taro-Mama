import Phaser from 'phaser'
import main from './main';

export default class InstrScene extends Phaser.Scene {
	constructor() {
		super('instr-scene')
	}
preload() {
    //preload here
}
create() {
    //create here
    this.add.text(100, 200, "Welcome to Taro Mama!\nYou will cook a traditional Hawaiin meal by following \na recipe. Each level will progess in difficulty: \n\nFirst level - drag and drop the picture ingredients together\nSecond level - drag the ingredient intructions in order \nThird level - correctly order the pseudocode to create the dish.", {
        color: '0x000000'
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