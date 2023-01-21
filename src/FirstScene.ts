import Phaser from 'phaser'
import main from './main';

export default class FirstScene extends Phaser.Scene {
    private rice : Phaser.GameObjects.GameObject | undefined;
    private seaweed : Phaser.GameObjects.GameObject | undefined;
    private spam : Phaser.GameObjects.GameObject | undefined;

	constructor() {
		super('first-scene')
	}
preload() {
    this.load.image("rice", "assets/ingredients/rice.png");
    this.load.image("seaweed", "assets/ingredients/seaweed.png");
    this.load.image("spam", "assets/ingredients/spam.png");
    this.load.image('list', 'public/assets/backgrounds/titlescene/ingredientList.png')
    this.load.image('table', 'public/assets/backgrounds/titlescene/table.png')
}
create() {
    //ingrediet list
    const scaledList = this.physics.add.image(100, 125, 'list');
    scaledList.displayWidth = Number(275);
    scaledList.scaleY = scaledList.scaleX;

    //table
    const scaledTable = this.physics.add.image(400, 550, 'table')
    scaledTable.displayWidth = Number(700)
    scaledTable.scaleY = scaledTable.scaleX
    
    //rice
    const scaledRice = this.physics.add.image(this.scale.width / 2, this.scale.height / 2, "rice").setInteractive();
    scaledRice.displayWidth = Number(main.config.width) * .2;
    scaledRice.scaleY = scaledRice.scaleX;
    this.rice = scaledRice;
    this.input.setDraggable(this.rice);

    //seaweed
    const scaledSeaweed = this.physics.add.image(this.scale.width / 3, this.scale.height / 3, "seaweed").setInteractive();
    scaledSeaweed.displayWidth = Number(main.config.width) * .12;
    scaledSeaweed.scaleY = scaledSeaweed.scaleX;
    this.seaweed = scaledSeaweed;
    this.input.setDraggable(this.seaweed);

    //spam
    const scaledSpam = this.physics.add.image(this.scale.width / 4, this.scale.height / 4, "spam").setInteractive();
    scaledSpam.displayWidth = Number(main.config.width) * .15;
    scaledSpam.scaleY = scaledSpam.scaleX;
    this.spam = scaledSpam;
    this.input.setDraggable(this.spam);

    //drag n drop 
    this.input.dragDistanceThreshold = 16;
    this.input.on('dragstart', function (_pointer: any, gameObject: { setTint: (arg0: number) => void; }) {
      gameObject.setTint(0xff0000);
    });
    this.input.on('drag', function (_pointer: any, gameObject: { x: number; y: number; }, dragX: number, dragY: number) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });
    this.input.on('dragend', function (_pointer: any, gameObject: { clearTint: () => void; }) {
      gameObject.clearTint();
    });
}
}