import Phaser from 'phaser'
import main from './main';

//Import function to check correct positions of pseudocode.
import { CheckPositions } from './CheckPositions';

export default class MusubiScene extends Phaser.Scene {
    //pseudo code
    private slice : Phaser.GameObjects.GameObject | undefined;
    private cook : Phaser.GameObjects.GameObject | undefined;
    private mold : Phaser.GameObjects.GameObject | undefined;
    private remove : Phaser.GameObjects.GameObject | undefined;
    private combine : Phaser.GameObjects.GameObject | undefined;
    private wrap : Phaser.GameObjects.GameObject | undefined;

    //solution text
    private feedback_text : Phaser.GameObjects.Text | undefined;

    //pop up objects
    private rect : Phaser.GameObjects.Rectangle | undefined;
    private popback : Phaser.GameObjects.Image | undefined;
    private poptext : Phaser.GameObjects.Text | undefined;
    private arrow : Phaser.GameObjects.Image | undefined;

    //random placement parameters
    private randomxMin : integer;
    private randomxMax : integer;
   
    private randomyMin : integer;
    private randomyMax : integer;
    private yIncrement : integer;
    private possibleYSteps : integer[];

    constructor() {
		super('musubi-scene-3')

        //define random placement parameters
        this.randomxMin = 50;
        this.randomxMax = 400;
        this.randomyMin = 50;
        this.randomyMax = 400;
        this.yIncrement = 20;
        this.possibleYSteps = [140,180,220,260,300,340];
	}

    preload() {
        //background
        this.load.image('table', 'assets/backgrounds/firstscene/table.png');
        this.load.image("brick", "assets/backgrounds/firstscene/brickBackground.jpg");
        this.load.image("check", "assets/buttons/checkmark.png");
        //win pop-up
        this.load.image("utensilpop", "assets/backgrounds/firstscene/utensilBackground.jpg");
        this.load.image("arrow","assets/buttons/rightarrow.png");
    }

    create() {
        //musubi
        const scaledMusubi = this.add.image(400, 450, "musubi");
        scaledMusubi.displayWidth = Number(main.config.width) * .2;
        scaledMusubi.scaleY = scaledMusubi.scaleX;

        //background 
        const scaledbackground = this.add.image(400, 300, "brick");
        scaledbackground.displayWidth = Number(main.config.width);
        scaledbackground.displayHeight = Number(main.config.height);

        //table
        const scaledTable = this.physics.add.image(400, 460, 'table');
        scaledTable.displayWidth = Number(700)
        scaledTable.scaleY = scaledTable.scaleX

        //bottom bar
        this.add.rectangle(400, 550, 800, 100, 0xffffff);

        //sounds
        const click_sound = this.sound.add("clicksound", {
            volume: .3
        })
        const levelCompletion_sound = this.sound.add("levelCompletion", {
            volume: .6
          })
        this.levelCompletion = levelCompletion_sound;

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

        //pseudo code 
        var tempStep = Phaser.Math.Between(0,this.possibleYSteps.length-1);
        const scaledSlice = this.add.text(50, this.possibleYSteps[tempStep], "Slice(SPAM);", {
            backgroundColor: '0x000000', fontSize: '58px', fontStyle: 'bold'
        }).setInteractive();
        this.possibleYSteps.splice(tempStep,1);
        scaledSlice.scale = 0.5;
        this.slice = scaledSlice;
        this.input.setDraggable(this.slice);
        this.slice.name = 'slice';
        
        var tempStep = Phaser.Math.Between(0,this.possibleYSteps.length-1);
        const scaledCook = this.add.text(50, this.possibleYSteps[tempStep], "Fry(SPAM);", {
            backgroundColor: '0x000000', fontSize: '58px', fontStyle: 'bold'
        }).setInteractive();
        this.possibleYSteps.splice(tempStep,1);
        scaledCook.scale = 0.5;
        this.cook = scaledCook;
        this.input.setDraggable(this.cook);
        this.cook.name = 'cook';
        

        var tempStep = Phaser.Math.Between(0,this.possibleYSteps.length-1);
        const scaledMold = this.add.text(50, this.possibleYSteps[tempStep], "Add-To-Mold(Rice);", {
            backgroundColor: '0x000000', fontSize: '58px', fontStyle: 'bold'
        }).setInteractive();
        this.possibleYSteps.splice(tempStep,1);
        scaledMold.scale = 0.5;
        this.mold = scaledMold;
        this.input.setDraggable(this.mold);
        this.mold.name = 'mold';
        

        var tempStep = Phaser.Math.Between(0,this.possibleYSteps.length-1);
        const scaledRemove = this.add.text(50, this.possibleYSteps[tempStep], "Remove-From-Mold(Rice);", {

            backgroundColor: '0x000000', fontSize: '58px', fontStyle: 'bold'
        }).setInteractive();
        this.possibleYSteps.splice(tempStep,1);
        scaledRemove.scale = 0.5;
        this.remove = scaledRemove;
        this.input.setDraggable(this.remove);
        this.remove.name = 'remove';
        
        var tempStep = Phaser.Math.Between(0,this.possibleYSteps.length-1);
        const scaledCombine = this.add.text(50, this.possibleYSteps[tempStep], "Stack(SPAM, rice);", {
            backgroundColor: '0x000000', fontSize: '58px', fontStyle: 'bold'
        }).setInteractive();
        this.possibleYSteps.splice(tempStep,1);
        scaledCombine.scale = 0.5;
        this.combine = scaledCombine;
        this.input.setDraggable(this.combine);
        this.combine.name = 'combine';
        

        var tempStep = Phaser.Math.Between(0,this.possibleYSteps.length-1);
        const scaledWrap = this.add.text(50, this.possibleYSteps[tempStep], "Wrap(nori, rice, SPAM);", {
            backgroundColor: '0x000000', fontSize: '58px', fontStyle: 'bold'
        }).setInteractive();
        this.possibleYSteps.splice(tempStep,1);
        scaledWrap.scale = 0.5;
        this.wrap = scaledWrap;
        this.input.setDraggable(this.wrap);
        this.wrap.name = 'wrap';
        
        const feedback_text = this.add.text(20,20,"Click the check button to get feedback.",{
            fontSize: '58px', fontStyle: 'bold',color:'0xff0000'
        });
        feedback_text.scale=0.5;
        this.feedback_text = feedback_text;
        
        //check directions button
        const checkDirections = this.add.image(760, 550, 'check');
        checkDirections.displayWidth = Number(main.config.width) * .08;
        checkDirections.scaleY = checkDirections.scaleX;
        checkDirections.setInteractive({ useHandCursor: true });
        checkDirections.on('pointerdown', () => this.clickCheckOrder());

        //win pop up 
        this.rect = this.add.rectangle(400, 230, 410, 310, 0x000000);
        this.rect.setVisible(false);
        this.popback = this.add.image(400, 230, "utensilpop");
        this.popback.displayWidth = 400;
        this.popback.displayHeight = 300;
        this.popback.setVisible(false);
        this.poptext = this.add.text(230, 120, "GREAT JOB!", {
            fontSize: '58px', fontStyle: 'bold', color: '0x000000'
        });
        this.poptext.setVisible(false);
        this.arrow = this.add.image(400, 300, 'arrow');
        this.arrow.scale = 0.2;
        this.arrow.setInteractive({ useHandCursor: true });
        this.arrow.on('pointerdown', () => this.clickFinish());
        this.arrow.setVisible(false);

        /*
        //zone 1
        this.zone1?.setRectangleDropZone(200, 50);
        this.zone1?.setX(400);
        this.zone1?.setY(450);

        //zone colors
        this.add.rectangle
        */
       //back button
       const back = this.add.image(45, 555, "exit");
       back.displayWidth = Number(main.config.width) * .08;
       back.scaleY = back.scaleX;
       back.setInteractive({ useHandCursor: true });
       back.on('pointerdown', () => this.clickBack());

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

    const spamTitle = this.add.text(480,70,'Spam Musubi Recipe', {color: "000000",  fontSize: '20px'})
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

    const helpText = this.add.text(525, 70,"Directions", {color: "000000", fontSize: '20px'})
    helpText.setVisible(false)

    const directions = this.add.text(430, 100, 
      `Level 3: Pseudocode Sorting \n\n Drag and drop the pseudocode on the screen in the correct order to make spam musubi. \n \n Reference the recipe in the recipe book for help. 
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

      //disable interactivity
      this.slice?.disableInteractive()
      this.cook?.disableInteractive()
      this.mold?.disableInteractive()
      this.remove?.disableInteractive()
      this.combine?.disableInteractive()
      this.wrap?.disableInteractive()
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

      //disable interactivity
      this.slice?.disableInteractive()
      this.cook?.disableInteractive()
      this.mold?.disableInteractive()
      this.remove?.disableInteractive()
      this.combine?.disableInteractive()
      this.wrap?.disableInteractive()
    });

    //on exit recipe button pushed
    exitRecipeBtn.on('pointerdown', () => {
      recipePaper.setVisible(false)
      exitRecipeBtn.setVisible(false)
      spamTitle.setVisible(false)
      spamSteps.setVisible(false)
      directions.setVisible(false)

      //enable interactivity
      this.slice?.setInteractive()
      this.cook?.setInteractive()
      this.mold?.setInteractive()
      this.remove?.setInteractive()
      this.combine?.setInteractive()
      this.wrap?.setInteractive()
    });

    //on exit help button pushed
    exitHelpBtn.on('pointerdown', () => {
      helpPaper.setVisible(false)
      exitHelpBtn.setVisible(false)
      helpText.setVisible(false)
      directions.setVisible(false)

      //enable interactivity
      this.slice?.setInteractive()
      this.cook?.setInteractive()
      this.mold?.setInteractive()
      this.remove?.setInteractive()
      this.combine?.setInteractive()
      this.wrap?.setInteractive()
    });

    // ------------------------------------------- END POPUPS -------------------------------------------------
    } // end create function
    clickBack() {
        this.scene.restart(this)
        this.scene.switch("recipe-scene");
    }
    clickFinish() {
        this.scene.restart(this)
        this.levelCompletion?.play();
        this.scene.switch('title-scene');
    }
    clickCheckOrder(){
        const order: Array<Phaser.GameObjects.GameObject> = [
                    <Phaser.GameObjects.GameObject>this.slice,
                    <Phaser.GameObjects.GameObject>this.cook,
                    <Phaser.GameObjects.GameObject>this.mold,
                    <Phaser.GameObjects.GameObject>this.remove,
                    <Phaser.GameObjects.GameObject>this.combine,
                    <Phaser.GameObjects.GameObject>this.wrap];
                    const feedbackString = String(CheckPositions(order));
                    this.feedback_text?.setText(<string>feedbackString);
        if(String(CheckPositions(order)) == 'All instructions are in the correct location') {
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
    update() {
        //
    }
}