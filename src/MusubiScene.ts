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

  //sounds
  private sceneCompletion : Phaser.Sound.BaseSound | undefined;

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

    //title
    const MainTitle = this.add.text(20,20,"Level 1: Combine The Ingredients",{
      fontSize: '58px', fontStyle: 'bold',color:'0xff0000'
    });
    MainTitle.scale=0.65;
    MainTitle.setVisible(true)

    //bottom bar
    this.add.rectangle(400, 550, 800, 100, 0xffffff);

    //Recipe Not Finished
    this.recipeFinished = false;

    //sounds
    const click_sound = this.sound.add("clicksound", {
      volume: .3
    })
    const sceneCompletion_sound = this.sound.add("sceneCompletion", {
      volume: .6
    })
    this.sceneCompletion = sceneCompletion_sound;

    //table
    const scaledTable = this.physics.add.image(400, 460, 'table');
    scaledTable.displayWidth = Number(700);
    scaledTable.scaleY = scaledTable.scaleX;
    
    //rice
    const scaledRice = this.physics.add.image(this.scale.width / 4, 440, "rice").setInteractive();
    scaledRice.displayWidth = Number(main.config.width) * .2;
    scaledRice.scaleY = scaledRice.scaleX;
    this.rice = scaledRice;
    this.input.setDraggable(this.rice);

    //seaweed
    const scaledSeaweed = this.physics.add.image(this.scale.width / 2, 430, "seaweed").setInteractive();
    scaledSeaweed.displayWidth = Number(main.config.width) * .12;
    scaledSeaweed.scaleY = scaledSeaweed.scaleX;
    this.seaweed = scaledSeaweed;
    this.input.setDraggable(this.seaweed);

    //spam
    const scaledSpam = this.physics.add.image(this.scale.width / 1.3, 430, "spam").setInteractive();
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
    const back = this.add.image(45, 555, "exit");
    back.displayWidth = Number(main.config.width) * .08;
    back.scaleY = back.scaleX;
    back.setInteractive({ useHandCursor: true });
    back.on('pointerdown', () => this.clickBack());

    //win pop up 
    this.rect = this.add.rectangle(400, 230, 410, 310, 0x000000);
    this.rect.setVisible(false);
    this.popback = this.add.image(400, 230, "utensilpop");
    this.popback.displayWidth = 400;
    this.popback.displayHeight = 300;
    this.popback.setVisible(false);
    this.poptext = this.add.text(320, 120, "NICE!", {
        fontSize: '58px', fontStyle: 'bold', color: '0x000000'
    });
    this.poptext.setVisible(false);
    this.arrow = this.add.image(400, 300, 'arrow');
    this.arrow.scale = 0.2;
    this.arrow.setInteractive({ useHandCursor: true });
    this.arrow.on('pointerdown', () => this.clickNext());
    this.arrow.setVisible(false);

    // ------------------------------------------- POPUPS -------------------------------------------------    
    //recipe help button
    const recipeBtn = this.add.image(125,555, "recipe");
    recipeBtn.scale = .125;
    recipeBtn.setInteractive({ useHandCursor: true });

    //direction help button
    const helpBtn = this.add.image(200, 560, "help")
    helpBtn.scale = .075
    helpBtn.setInteractive({ useHandCursor: true });
    
    //for recipe popup
    const recipePaper = this.add.image(325,-10, "list")
    recipePaper.setOrigin(0,0)
    recipePaper.scale = .75
    recipePaper.setVisible(false)

    const exitRecipeBtn = this.add.image(725,70, "exit")
    exitRecipeBtn.scale = .06
    exitRecipeBtn.setInteractive({ useHandCursor: true });
    exitRecipeBtn.setVisible(false)

    const spamTitle = this.add.text(480,70,'Spam Musubi Recipe', {color: "000000", fontSize: '20px'})
    const spamSteps = this.add.text(425, 100, 
      `Step 1: Slice spam into 8-10 slices. \n
      Step 2: Fry SPAM on each side over medium heat until slightly crispy or until desired doneness. \n
      Step 3: Add Sushi Rice to the mold and press down. \n
      Step 4: Remove the rice from the mold. \n
      Step 5: Add a slice of cooked SPAM to the top of the rice. \n
      Step 6: Wrap up one side of the nori and stick it to the top of the SPAM, then wrap up the other side.\n
      `, {wordWrap: {width: 325}, align: 'center', color: "000000"})
    
    spamTitle.setVisible(false)
    spamSteps.setVisible(false)

    //for help popup
    const helpPaper = this.add.image(325,-10, "list")
    helpPaper.setOrigin(0,0)
    helpPaper.scale = .75
    helpPaper.setVisible(false)

    const exitHelpBtn = this.add.image(725,70, "exit")
    exitHelpBtn.scale = .06
    exitHelpBtn.setInteractive({ useHandCursor: true });
    exitHelpBtn.setVisible(false)

    const helpText = this.add.text(525, 70,"Directions", {color: "000000",  fontSize: '20px'})
    helpText.setVisible(false)

    const directions = this.add.text(430, 100, 
      `Level 1: Ingredient Matching \n\n Drag and drop the ingredients on the screen to combine them to make spam musubi. \n \n Reference the recipe in the recipe book for help. \n\n The ingredients only need to be put together, not prepared.
      `, {wordWrap: {width: 325}, align: 'center', color: "000000"});
    directions.setVisible(false);

    //on recipe button pushed
    recipeBtn.on('pointerdown', () => {
      recipePaper.setVisible(true)
      exitRecipeBtn.setVisible(true)
      spamTitle.setVisible(true)
      spamSteps.setVisible(true)
      helpPaper.setVisible(false)
      exitHelpBtn.setVisible(false);
      helpText.setVisible(false);
      directions.setVisible(false);
      this.spam?.disableInteractive()
      this.rice?.disableInteractive()
      this.seaweed?.disableInteractive()

    });
    
    //on help button pushed
    helpBtn.on('pointerdown', () => {
      helpPaper.setVisible(true)
      exitHelpBtn.setVisible(true)
      helpText.setVisible(true)
      directions.setVisible(true)
      recipePaper.setVisible(false)
      exitRecipeBtn.setVisible(false)
      spamTitle.setVisible(false)
      spamSteps.setVisible(false)
      this.spam?.disableInteractive()
      this.rice?.disableInteractive()
      this.seaweed?.disableInteractive()
    });

    //on exit recipe button pushed
    exitRecipeBtn.on('pointerdown', () => {
      recipePaper.setVisible(false)
      exitRecipeBtn.setVisible(false)
      spamTitle.setVisible(false)
      spamSteps.setVisible(false)
      directions.setVisible(false)
      this.spam?.setInteractive();
      this.seaweed?.setInteractive();
      this.rice?.setInteractive();
    });

    //on exit help button pushed
    exitHelpBtn.on('pointerdown', () => {
      helpPaper.setVisible(false)
      exitHelpBtn.setVisible(false)
      helpText.setVisible(false)
      directions.setVisible(false)
      this.spam?.setInteractive();
      this.seaweed?.setInteractive();
      this.rice?.setInteractive();
    });

    // ------------------------------------------- END POPUPS -------------------------------------------------

  } // end create function
  clickBack() {
    this.scene.restart(this)
    this.scene.switch("recipe-scene");
  }
  clickNext() {
    this.scene.restart(this)
    this.sceneCompletion?.play();
    this.scene.switch("musubi-scene-2");
  }
  update() {
    //Creates Musubi when all items are near each other on table
    if(!this.rice) { return }
    if(!this.seaweed) { return }
    if(!this.spam) { return }
  
    //mixing ingredients part //375
    if ((this.rice.body.position.y >= 300) && 
      (this.seaweed.body.position.y >= 300) && 
      (this.spam.body.position.y >= 300) && 
      (Phaser.Math.Difference(this.rice.body.position.x, this.seaweed.body.position.x) <= 150) && 
      (Phaser.Math.Difference(this.rice.body.position.x, this.spam.body.position.x) <= 150) && this.recipeFinished == false)
      {
        const soundEffect = this.sound.add("completedRecipe")
        soundEffect.play();
        const scaledMusubi = this.physics.add.image(400, 450, "musubi");
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
