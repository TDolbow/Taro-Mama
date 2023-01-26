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
   

	constructor() {
		super('musubi-scene')
	}
preload() {
    this.load.image("rice", "assets/ingredients/rice.png");
    this.load.image("seaweed", "assets/ingredients/seaweed.png");
    this.load.image("spam", "assets/ingredients/spam.png");
    this.load.image('list', 'assets/backgrounds/firstscene/ingredientList.png');
    this.load.image('table', 'assets/backgrounds/firstscene/table.png');
    this.load.image("brick", "assets/backgrounds/firstscene/brickBackground.jpg");
    this.load.image("musubi", "assets/ingredients/musubi.png");

    //for recipe help button
    this.load.image('recipe', 'assets/buttons/recipeBook.png')
    //for direction help button 
    this.load.image('help', 'assets/buttons/help.png')
    //for recipe popup
    this.load.image('exit', 'assets/buttons/exit.png')
    //for popup background
    this.load.image('background', 'assets/backgrounds/firstscene/black.jpg')

  } //end preload function
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


    // ------------------------------------------- MAIN SCREEN POPUPS -------------------------------------------------
    
    //recipe help button
    const recipeBtn = this.add.image(125,535, "recipe");
    recipeBtn.scale = .125;
    recipeBtn.setInteractive({ useHandCursor: true });

    //direction help button
    const helpBtn = this.add.image(200, 540, "help")
    helpBtn.scale = .075
    helpBtn.setInteractive({ useHandCursor: true });

    //background to stop interactivity
    //const background = this.add.image(0, 0, 'background')
    //background.setAlpha(.7,.7,.7,.7);
    
    //for recipe popup
    const recipePaper = this.add.image(275,-10, "list")
    recipePaper.setOrigin(0,0)
    recipePaper.scale = .85
    recipePaper.setVisible(false)

    const exitRecipeBtn = this.add.image(725,70, "exit")
    exitRecipeBtn.scale = .06
    exitRecipeBtn.setInteractive({ useHandCursor: true });
    exitRecipeBtn.setVisible(false)

    const spamTitle = this.add.text(475,70,'Spam Musubi Recipe')
    const spamSteps = this.add.text(425, 100, 
      `Step 1: Slice spam into 8-10 slices. Mix oyster sauce, soy sauce, and sugar until sugar is dissolved and marinate with the SPAM. \n
      Step 2: Drain off marinade and fry SPAM on each side over medium heat until slightly crispy or until desired doneness. \n
      Step 3: Place a strip of nori on a cutting board or clean surface (shiny side down). Place your Musubi mold across the middle of the nori. Add Sushi Rice to the mold. \n
      Step 4: Next, remove the mold from the rice. Now you will have a nice little block of rice right on the nori. Add some of the cooked SPAM to the top. Wrap up one side of the nori and stick it to the top of the SPAM, then wrap up the other side.
      `, {wordWrap: {width: 325}})
    
    spamTitle.setVisible(false)
    spamSteps.setVisible(false)

    //for help popup
    const helpPaper = this.add.image(275,-10, "list")
    helpPaper.setOrigin(0,0)
    helpPaper.scale = .85
    helpPaper.setVisible(false)

    const exitHelpBtn = this.add.image(725,70, "exit")
    exitHelpBtn.scale = .06
    exitHelpBtn.setInteractive({ useHandCursor: true });
    exitHelpBtn.setVisible(false)

    const helpText = this.add.text(475,100,"Directions")
    helpText.setVisible(false)

    const directions = this.add.text(425, 100, 
      `
      Level 1: Ingredient Matching /n
      Drag and drop the ingredients on the screen to combine them to make spam musubi. Reference the recipe in the recipe book for help. 
      `, {wordWrap: {width: 325}})

      directions.setVisible(false)

    //on recipe button pushed
    recipeBtn.on('pointerdown', (event: MouseEvent) => {
      recipePaper.setVisible(true)
      exitRecipeBtn.setVisible(true)
      spamTitle.setVisible(true)
      spamSteps.setVisible(true)

      helpPaper.setVisible(false)
      exitHelpBtn.setVisible(false);
      helpText.setVisible(false);
      directions.setVisible(false);


      this.physics.pause();

    });
    

    //on help button pushed
    helpBtn.on('pointerdown', (event: MouseEvent) => {
      helpPaper.setVisible(true)
      exitHelpBtn.setVisible(true)
      helpText.setVisible(true)
      directions.setVisible(true)

      recipePaper.setVisible(false)
      exitRecipeBtn.setVisible(false)
      spamTitle.setVisible(false)
      spamSteps.setVisible(false)

    });

    //on exit recipe button pushed
    exitRecipeBtn.on('pointerdown', (event: MouseEvent) => {
      recipePaper.setVisible(false)
      exitRecipeBtn.setVisible(false)
      spamTitle.setVisible(false)
      spamSteps.setVisible(false)
      //directions.setVisible(false)

    });

    //on exit help button pushed
    exitHelpBtn.on('pointerdown', (event: MouseEvent) => {
      helpPaper.setVisible(false)
      exitHelpBtn.setVisible(false)
      helpText.setVisible(false)

    });

    // ------------------------------------------- END POPUPS -------------------------------------------------

  } // end create function

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