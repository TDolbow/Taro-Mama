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
    this.add.text(200, 300, "instruction scene - will implement later", {
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