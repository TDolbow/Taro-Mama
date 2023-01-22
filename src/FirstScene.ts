import Phaser from 'phaser'
import main from './main';

export default class FirstScene extends Phaser.Scene {
    private rice : Phaser.GameObjects.GameObject | undefined;
    private seaweed : Phaser.GameObjects.GameObject | undefined;
    private spam : Phaser.GameObjects.GameObject | undefined;
    private musubi: Phaser.GameObjects.GameObject | undefined;
    private recipeFinished?: boolean;

    //FOR RECIPE POPUP
    recipeBtn?: Phaser.GameObjects.Image;
	  

	constructor() {
		super('first-scene')
	}
preload() {
    this.load.image("rice", "assets/ingredients/rice.png");
    this.load.image("seaweed", "assets/ingredients/seaweed.png");
    this.load.image("spam", "assets/ingredients/spam.png");
    this.load.image("musubi", "assets/ingredients/musubi.png");
    this.load.image('list', 'assets/backgrounds/titlescene/ingredientList.png')
    this.load.image('table', 'assets/backgrounds/titlescene/table.png')

    //for recipe popup
    this.load.image("recipe", "assets/buttons/recipeBook.jpg")
}
create() {
    //Recipe Not Finished
    this.recipeFinished = false;

    //sounds
    var click_sound = this.sound.add("clicksound", {
      volume: .3
    })

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
      click_sound.play();
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
    this.recipeBtn = this.add.image(50, 500, "recipe");
    this.recipeBtn.setScale(.25)
    this.recipeBtn.setInteractive({ useHandCursor: true });

    // on popup button clicked

    this.recipeBtn.on('pointerdown',(event: MouseEvent) => {
      click_sound.play();
      this.scene.start('spam-scene');
  });

    //this.recipeBtn.on('pointerdown', () => this.scene.start('spam-scene'));
  }

  update() {
    //Creates Musubi when all items are near each other on table
    if(!this.rice) {
      return
    }
    if(!this.seaweed) {
      return
    }
    if(!this.spam) {
      return
    }
    if ((this.rice.body.position.y >= 375) && 
      (this.seaweed.body.position.y >= 375) && 
      (this.spam.body.position.y >= 375) && 
      (Phaser.Math.Difference(this.rice.body.position.x, this.seaweed.body.position.x) <= 150) && 
      (Phaser.Math.Difference(this.rice.body.position.x, this.spam.body.position.x) <= 150) &&
      this.recipeFinished == false){
        const soundEffect = this.sound.add("completedRecipe")
        soundEffect.play();
        const scaledMusubi = this.physics.add.image(this.rice.body.position.x + 50, this.rice.body.position.y + 50, "musubi");
        scaledMusubi.displayWidth = Number(main.config.width) * .2;
        scaledMusubi.scaleY = scaledMusubi.scaleX;
        this.musubi = scaledMusubi;
        this.rice.destroy;
        this.seaweed.destroy;
        this.spam.destroy;
        this.rice.body.gameObject.setVisible(false);
        this.seaweed.body.gameObject.setVisible(false);
        this.spam.body.gameObject.setVisible(false);
        this.recipeFinished = true;
      }
    }
  }