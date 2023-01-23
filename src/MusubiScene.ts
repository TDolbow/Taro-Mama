import Phaser from 'phaser'
import main from './main';

export default class MusubiScene extends Phaser.Scene {
    //ingredients
    private rice : Phaser.GameObjects.GameObject | undefined;
    private seaweed : Phaser.GameObjects.GameObject | undefined;
    private spam : Phaser.GameObjects.GameObject | undefined;
    //pseudo code
    private slice : Phaser.GameObjects.GameObject | undefined;
    private cook : Phaser.GameObjects.GameObject | undefined;
    private mold : Phaser.GameObjects.GameObject | undefined;
    private remove : Phaser.GameObjects.GameObject | undefined;
    private combine : Phaser.GameObjects.GameObject | undefined;
    private wrap : Phaser.GameObjects.GameObject | undefined;
  //FOR RECIPE POPUP
  recipeBtn?: Phaser.GameObjects.Image;

	constructor() {
		super('musubi-scene')
	}
preload() {
    this.load.image("rice", "assets/ingredients/rice.png");
    this.load.image("seaweed", "assets/ingredients/seaweed.png");
    this.load.image("spam", "assets/ingredients/spam.png");
    //this.load.image('list', 'assets/backgrounds/firstscene/ingredientList.png');
    this.load.image('table', 'assets/backgrounds/firstscene/table.png');
    this.load.image("brick", "assets/backgrounds/firstscene/brickBackground.jpg")

    //for recipe popup
    this.load.image("recipe", "assets/buttons/recipeBook.jpg")
  }
create() {
    //background 
    const scaledbackground = this.add.image(400, 300, "brick");
    scaledbackground.displayWidth = Number(main.config.width);
    scaledbackground.displayHeight = Number(main.config.height);


    //ingrediet list
    /*
    const scaledList = this.physics.add.image(100, 125, 'list');
    scaledList.displayWidth = Number(275);
    scaledList.scaleY = scaledList.scaleX;
    */

    //table
    const scaledTable = this.physics.add.image(400, 550, 'table')
    scaledTable.displayWidth = Number(700)
    scaledTable.scaleY = scaledTable.scaleX
    
    //rice
    const scaledRice = this.physics.add.image(this.scale.width / 4, this.scale.height / 1.2, "rice").setInteractive();
    scaledRice.displayWidth = Number(main.config.width) * .2;
    scaledRice.scaleY = scaledRice.scaleX;
    this.rice = scaledRice;
    this.input.setDraggable(this.rice);

    //seaweed
    const scaledSeaweed = this.physics.add.image(this.scale.width / 2, this.scale.height / 1.2, "seaweed").setInteractive();
    scaledSeaweed.displayWidth = Number(main.config.width) * .12;
    scaledSeaweed.scaleY = scaledSeaweed.scaleX;
    this.seaweed = scaledSeaweed;
    this.input.setDraggable(this.seaweed);

    //spam
    const scaledSpam = this.physics.add.image(this.scale.width / 1.3, this.scale.height / 1.2, "spam").setInteractive();
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

    // FOR POPUP
    this.recipeBtn = this.add.image(750, 500, "recipe");
    this.recipeBtn.setScale(.25)
    this.recipeBtn.setInteractive({ useHandCursor: true });

    // on popup button clicked
    this.recipeBtn.on('pointerdown',() => { //event: MouseEvent
      this.scene.start('spam-scene');
    });

    //back button
    const back = this.add.text(10, 500, "Quit", {
      fontSize: '58px'
      });
    back.setTint(0xFF0000);
    back.displayWidth = Number(main.config.width) * .1;
    back.scaleY = back.scaleX;
    back.setInteractive({ useHandCursor: true });
    back.on('pointerdown', () => this.clickBack());

    //pseudo code 
    const scaledSlice = this.add.text(50, 50, "Slice();", {
      backgroundColor: '0x000000', fontSize: '58px', fontStyle: 'bold'
    }).setInteractive();
    scaledSlice.scale = 0.5;
    this.slice = scaledSlice;
    this.input.setDraggable(this.slice);

    const scaledCook = this.add.text(50, 90, "Cook();", {
      backgroundColor: '0x000000', fontSize: '58px', fontStyle: 'bold'
    }).setInteractive();
    scaledCook.scale = 0.5;
    this.cook = scaledCook;
    this.input.setDraggable(this.cook);

    const scaledMold = this.add.text(50, 130, "Create-Mold();", {
      backgroundColor: '0x000000', fontSize: '58px', fontStyle: 'bold'
    }).setInteractive();
    scaledMold.scale = 0.5;
    this.mold = scaledMold;
    this.input.setDraggable(this.mold);

    const scaledRemove = this.add.text(50, 170, "Remove-Extra-Rice();", {
      backgroundColor: '0x000000', fontSize: '58px', fontStyle: 'bold'
    }).setInteractive();
    scaledRemove.scale = 0.5;
    this.remove = scaledRemove;
    this.input.setDraggable(this.remove);

    const scaledCombine = this.add.text(50, 210, "Combine();", {
      backgroundColor: '0x000000', fontSize: '58px', fontStyle: 'bold'
    }).setInteractive();
    scaledCombine.scale = 0.5;
    this.combine = scaledCombine;
    this.input.setDraggable(this.combine);

    const scaledWrap = this.add.text(50, 250, "Wrap();", {
      backgroundColor: '0x000000', fontSize: '58px', fontStyle: 'bold'
    }).setInteractive();
    scaledWrap.scale = 0.5;
    this.wrap = scaledWrap;
    this.input.setDraggable(this.wrap);
  }
  clickBack() {
    this.scene.switch("recipe-scene");
}
}