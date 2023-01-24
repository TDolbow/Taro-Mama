import Phaser from 'phaser'
import main from './main';

//Import function to check correct positions of pseudocode.
import { CheckPositions } from './CheckPositions';

export default class MusubiScene extends Phaser.Scene {
    //ingredients
    private rice : Phaser.GameObjects.GameObject | undefined;
    private seaweed : Phaser.GameObjects.GameObject | undefined;
    private spam : Phaser.GameObjects.GameObject | undefined;
    private musubi: Phaser.GameObjects.GameObject | undefined;
    private recipeFinished?: boolean;
    //pseudo code
    private slice : Phaser.GameObjects.GameObject | undefined;
    private cook : Phaser.GameObjects.GameObject | undefined;
    private mold : Phaser.GameObjects.GameObject | undefined;
    private remove : Phaser.GameObjects.GameObject | undefined;
    private combine : Phaser.GameObjects.GameObject | undefined;
    private wrap : Phaser.GameObjects.GameObject | undefined;


    private feedback_text : Phaser.GameObjects.Text | undefined;

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
    this.load.image("brick", "assets/backgrounds/firstscene/brickBackground.jpg");
    this.load.image("musubi", "assets/ingredients/musubi.png");

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
    this.recipeBtn = this.add.image(750, 500, "recipe");
    this.recipeBtn.setScale(.25)
    this.recipeBtn.setInteractive({ useHandCursor: true });

    // on popup button clicked
    this.recipeBtn.on('pointerdown',() => { //event: MouseEvent
      click_sound.play();
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
    this.slice.name = 'slice';

    const scaledCook = this.add.text(50, 90, "Cook();", {
      backgroundColor: '0x000000', fontSize: '58px', fontStyle: 'bold'
    }).setInteractive();
    scaledCook.scale = 0.5;
    this.cook = scaledCook;
    this.input.setDraggable(this.cook);
    this.cook.name = 'cook';


    const scaledMold = this.add.text(50, 130, "Create-Mold();", {
      backgroundColor: '0x000000', fontSize: '58px', fontStyle: 'bold'
    }).setInteractive();
    scaledMold.scale = 0.5;
    this.mold = scaledMold;
    this.input.setDraggable(this.mold);
    this.mold.name = 'mold';


    const scaledRemove = this.add.text(50, 170, "Remove-Extra-Rice();", {
      backgroundColor: '0x000000', fontSize: '58px', fontStyle: 'bold'
    }).setInteractive();
    scaledRemove.scale = 0.5;
    this.remove = scaledRemove;
    this.input.setDraggable(this.remove);
    this.remove.name = 'remove';


    const scaledCombine = this.add.text(50, 210, "Combine();", {
      backgroundColor: '0x000000', fontSize: '58px', fontStyle: 'bold'
    }).setInteractive();
    scaledCombine.scale = 0.5;
    this.combine = scaledCombine;
    this.input.setDraggable(this.combine);
    this.combine.name = 'combine';


    const scaledWrap = this.add.text(50, 250, "Wrap();", {
      backgroundColor: '0x000000', fontSize: '58px', fontStyle: 'bold'
    }).setInteractive();
    scaledWrap.scale = 0.5;
    this.wrap = scaledWrap;
    this.input.setDraggable(this.wrap);
    this.wrap.name = 'wrap';

    const feedback_text = this.add.text(20,20,"Click the check button to get feedback.",{
    fontSize: '58px', fontStyle: 'bold',color:'0xff0000'
    });
    feedback_text.scale=0.5;
    this.feedback_text = feedback_text;

    const checkCode = this.add.text(10, 450, "Check Code", {
      fontSize: '58px'
      });
      checkCode.setTint(0xFF0000);
      checkCode.displayWidth = Number(main.config.width) * .25;
      checkCode.scaleY = back.scaleX;
      checkCode.setInteractive({ useHandCursor: true });
      checkCode.on('pointerdown', () => this.clickCheckOrder());

    

  }
  clickBack() {
    this.scene.switch("recipe-scene");
}


  clickCheckOrder(){
    
    
    let order: Array<Phaser.GameObjects.GameObject> = [
                <Phaser.GameObjects.GameObject>this.slice,
                <Phaser.GameObjects.GameObject>this.cook,
                <Phaser.GameObjects.GameObject>this.mold,
                <Phaser.GameObjects.GameObject>this.remove,
                <Phaser.GameObjects.GameObject>this.combine,
                <Phaser.GameObjects.GameObject>this.wrap];
                
                
                var feedbackString:String = CheckPositions(order);
                this.feedback_text?.setText(<string>feedbackString);
  
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
    this.recipeFinished == false)
    {
      const soundEffect = this.sound.add("completedRecipe")
      soundEffect.play();
      const scaledMusubi = this.physics.add.image(this.rice.body.position.x + 50, this.rice.body.position.y + 50, "musubi");
      scaledMusubi.displayWidth = Number(main.config.width) * .2;
      scaledMusubi.scaleY = scaledMusubi.scaleX;
      this.musubi = scaledMusubi;
      this.musubi.body.gameObject.setVisible(true);
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