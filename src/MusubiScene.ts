import Phaser from 'phaser'
import main from './main';

export default class MusubiScene extends Phaser.Scene {
    //ingredients
    private rice : Phaser.GameObjects.GameObject | undefined;
    private seaweed : Phaser.GameObjects.GameObject | undefined;
    private spam : Phaser.GameObjects.GameObject | undefined;
    private musubi: Phaser.GameObjects.GameObject | undefined;
    private recipeFinished ?: boolean;

    //pop up objects
    private rect : Phaser.GameObjects.Rectangle | undefined;
    private popback : Phaser.GameObjects.Image | undefined;
    private poptext : Phaser.GameObjects.Text | undefined;
    private arrow : Phaser.GameObjects.Image | undefined;

  //FOR RECIPE POPUP
  recipeBtn?: Phaser.GameObjects.Image;
 
	constructor() {
		super('musubi-scene')
	}
  preload() {
    //ingredients
    this.load.image("rice", "assets/ingredients/rice.png");
    this.load.image("seaweed", "assets/ingredients/seaweed.png");
    this.load.image("spam", "assets/ingredients/spam.png");
    this.load.image("musubi", "assets/ingredients/musubi.png");

    //background
    this.load.image('list', 'assets/backgrounds/firstscene/ingredientList.png');
    this.load.image('table', 'assets/backgrounds/firstscene/table.png');
    this.load.image("brick", "assets/backgrounds/firstscene/brickBackground.jpg");

    //pop-up
    this.load.image("utensilpop", "assets/backgrounds/firstscene/utensilBackground.jpg");
    this.load.image("arrow","assets/buttons/rightarrow.png");

    //for recipe popup
    this.load.image("recipe", "assets/buttons/recipeBook.jpg")
  }
  create() {
    //background 
    const scaledbackground = this.add.image(400, 300, "brick");
    scaledbackground.displayWidth = Number(main.config.width);
    scaledbackground.displayHeight = Number(main.config.height);

    //Recipe Not Finished
    this.recipeFinished = false;

    //sounds
    const click_sound = this.sound.add("clicksound", {
      volume: .3
    })

    //table
    const scaledTable = this.physics.add.image(400, 550, 'table');
    scaledTable.displayWidth = Number(700);
    scaledTable.scaleY = scaledTable.scaleX;
    
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
    //Ingredient List
    const scaledRecipe = this.physics.add.image(630,225, 'list')
    scaledRecipe.displayWidth = Number(main.config.width) * 0.6;
    scaledRecipe.scaleY = scaledRecipe.scaleX
    
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
   /*  
    // FOR POPUP
    this.recipeBtn = this.add.image(750, 500, "recipe");
    this.recipeBtn.setScale(.25)
    this.recipeBtn.setInteractive({ useHandCursor: true });

    // on popup button clicked
    this.recipeBtn.on('pointerdown',() => { //event: MouseEvent
      click_sound.play();
      this.scene.start('spam-scene');
    });
 */
    //back button
    const back = this.add.text(10, 500, "Quit", {
      fontSize: '58px'
      });
    back.setTint(0xFF0000);
    back.displayWidth = Number(main.config.width) * .1;
    back.scaleY = back.scaleX;
    back.setInteractive({ useHandCursor: true });
    back.on('pointerdown', () => this.clickBack());

    //win pop up 
    this.rect = this.add.rectangle(400, 300, 410, 310, 0x000000);
    this.rect.setVisible(false);
    this.popback = this.add.image(400, 300, "utensilpop");
    this.popback.displayWidth = 400;
    this.popback.displayHeight = 300;
    this.popback.setVisible(false);
    this.poptext = this.add.text(320, 150, "NICE!", {
        fontSize: '58px', fontStyle: 'bold', color: '0x000000'
    });
    this.poptext.setVisible(false);
    this.arrow = this.add.image(400, 350, 'arrow');
    this.arrow.scale = 0.2;
    this.arrow.setInteractive({ useHandCursor: true });
    this.arrow.on('pointerdown', () => this.clickNext());
    this.arrow.setVisible(false);
  }
    
  clickBack() {
    this.scene.switch("recipe-scene");
  }
  clickNext() {
    this.scene.switch("musubi-scene-2");
  }
  
update() {
  //Creates Musubi when all items are near each other on table
  if(!this.rice) { return }
  if(!this.seaweed) { return }
  if(!this.spam) { return }

  //mixing ingredients part
  if ((this.rice.body.position.y >= 375) && 
    (this.seaweed.body.position.y >= 375) && 
    (this.spam.body.position.y >= 375) && 
    (Phaser.Math.Difference(this.rice.body.position.x, this.seaweed.body.position.x) <= 150) && 
    (Phaser.Math.Difference(this.rice.body.position.x, this.spam.body.position.x) <= 150) && this.recipeFinished == false)
    {
      const soundEffect = this.sound.add("completedRecipe")
      soundEffect.play();
      const scaledMusubi = this.physics.add.image(400, 530, "musubi");
      scaledMusubi.displayWidth = Number(main.config.width) * .2;
      scaledMusubi.scaleY = scaledMusubi.scaleX;
      this.musubi = scaledMusubi;
      this.musubi.body.gameObject.setVisible(true);
      this.rice.body.gameObject.setVisible(false);
      this.seaweed.body.gameObject.setVisible(false);
      this.spam.body.gameObject.setVisible(false);
      this.recipeFinished = true;
    }
    if(this.recipeFinished) {
      this.rect?.setVisible(true);
      this.popback?.setVisible(true);
      this.poptext?.setVisible(true);
      this.arrow?.setVisible(true);
  } else {
      this.rect?.setVisible(false);
      this.popback?.setVisible(false);
      this.poptext?.setVisible(false);
      this.arrow?.setVisible(false);
  }
  }
}