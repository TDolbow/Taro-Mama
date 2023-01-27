import Phaser from 'phaser'
import main from './main';
import { CheckPositions } from './CheckPositions';

export default class MusubiScene extends Phaser.Scene {
    //solution text
    private feedback_text : Phaser.GameObjects.Text | undefined;

    //pop up objects
    private rect : Phaser.GameObjects.Rectangle | undefined;
    private popback : Phaser.GameObjects.Image | undefined;
    private poptext : Phaser.GameObjects.Text | undefined;
    private arrow : Phaser.GameObjects.Image | undefined;

    //pseudo code
    private step1 : Phaser.GameObjects.GameObject | undefined;
    private step2 : Phaser.GameObjects.GameObject | undefined;
    private step3 : Phaser.GameObjects.GameObject | undefined;
    private step4 : Phaser.GameObjects.GameObject | undefined;
    private step5 : Phaser.GameObjects.GameObject | undefined;
    private step6 : Phaser.GameObjects.GameObject | undefined;

    //sound
    private sceneCompletion : Phaser.Sound.BaseSound | undefined;

    constructor() {
		super('musubi-scene-2')
	}

    preload() {
        //background
        this.load.image('table', 'assets/backgrounds/firstscene/table.png');
        this.load.image("brick", "assets/backgrounds/firstscene/brickBackground.jpg");
        this.load.image("check", "assets/buttons/checkmark.png");
        //win pop-up
        this.load.image("utensilpop", "assets/backgrounds/firstscene/utensilBackground.jpg");
        this.load.image("arrow","assets/buttons/rightarrow.png");
        //musubi
        this.load.image("musubi", "assets/ingredients/musubi.png");

        //for recipe help button
        this.load.image('recipe', 'assets/buttons/recipeBook.png')
        //for direction help button 
        this.load.image('help', 'assets/buttons/help.png')
        //for recipe popup
        this.load.image('exit', 'assets/buttons/exit.png')

    } //end preload function

    create() {
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

        //recipe directions
        const scaledStep1 = this.add.text(50, 50, "Slice the spam", {
            color: '0x000000', fontSize: '58px', fontStyle: 'bold'
        }).setInteractive();
        scaledStep1.scale = 0.5;
        this.step1 = scaledStep1;
        this.input.setDraggable(this.step1);
        this.step1.name = 'step1';
        
        const scaledStep2 = this.add.text(50, 90, "Cook the spam", {
            color: '0x000000', fontSize: '58px', fontStyle: 'bold'
        }).setInteractive();
        scaledStep2.scale = 0.5;
        this.step2 = scaledStep2;
        this.input.setDraggable(this.step2);
        this.step2.name = 'step2';
        
        const scaledStep3 = this.add.text(50, 130, "make musubi mold with rice", {
            color: '0x000000', fontSize: '58px', fontStyle: 'bold'
        }).setInteractive();
        scaledStep3.scale = 0.5;
        this.step3 = scaledStep3;
        this.input.setDraggable(this.step3);
        this.step3.name = 'step3';
        
        const scaledStep4 = this.add.text(50, 170, "remove extra rice from musubi mold", {
            color: '0x000000', fontSize: '58px', fontStyle: 'bold'
        }).setInteractive();
        scaledStep4.scale = 0.5;
        this.step4 = scaledStep4;
        this.input.setDraggable(this.step4);
        this.step4.name = 'step4';
        
        const scaledStep5 = this.add.text(50, 210, "add cooked spam to rice mold", {
            color: '0x000000', fontSize: '58px', fontStyle: 'bold'
        }).setInteractive();
        scaledStep5.scale = 0.5;
        this.step5 = scaledStep5;
        this.input.setDraggable(this.step5);
        this.step5.name = 'step5';
        
        const scaledStep6 = this.add.text(50, 250, "wrap spam & rice in nori", {
            color: '0x000000', fontSize: '58px', fontStyle: 'bold'
        }).setInteractive();
        scaledStep6.scale = 0.5;
        this.step6 = scaledStep6;
        this.input.setDraggable(this.step6);
        this.step6.name = 'step6';

        const scaledMusubi = this.add.image(400, 450, "musubi");
        scaledMusubi.displayWidth = Number(main.config.width) * .2;
        scaledMusubi.scaleY = scaledMusubi.scaleX;

        //sounds
        const click_sound = this.sound.add("clicksound", {
            volume: .3
        })
        const sceneCompletion_sound = this.sound.add("sceneCompletion", {
            volume: .6
          })
        this.sceneCompletion = sceneCompletion_sound;

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

        const feedback_text = this.add.text(20,20,"Click the check button to get feedback.",{
            fontSize: '58px', fontStyle: 'bold',color:'0xff0000'
        });
        feedback_text.scale=0.5;
        this.feedback_text = feedback_text;
        
        //back button
        const back = this.add.image(45, 555, "exit");
        back.displayWidth = Number(main.config.width) * .08;
        back.scaleY = back.scaleX;
        back.setInteractive({ useHandCursor: true });
        back.on('pointerdown', () => this.clickBack());

        //check directions button
        const checkDirections = this.add.image(760, 550, 'check');
        checkDirections.displayWidth = Number(main.config.width) * .08;
        checkDirections.scaleY = checkDirections.scaleX;
        checkDirections.setInteractive({ useHandCursor: true });
        checkDirections.on('pointerdown', () => this.clickCheckOrder());

        //win pop up 
        this.rect = this.add.rectangle(400, 300, 410, 310, 0x000000);
        this.rect.setVisible(false);
        this.popback = this.add.image(400, 300, "utensilpop");
        this.popback.displayWidth = 400;
        this.popback.displayHeight = 300;
        this.popback.setVisible(false);
        this.poptext = this.add.text(260, 150, "CORRECT!", {
            fontSize: '58px', fontStyle: 'bold', color: '0x000000'
        });
        this.poptext.setVisible(false);
        this.arrow = this.add.image(400, 350, 'arrow');
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
      Step 3: Place a strip of nori on a cutting board. Place your Musubi mold across the middle of the nori. Add Sushi Rice to the mold and press down. \n
      Step 4: Remove the mold from the rice. \n
      Step 5: Add some of the cooked SPAM to the top. \n
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
      `Level 2: Direction Sorting \n\n Drag and drop the directions on the screen in the correct order to make spam musubi. \n \n Reference the recipe in the recipe book for help.  
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
    });

    //on exit recipe button pushed
    exitRecipeBtn.on('pointerdown', () => {
      recipePaper.setVisible(false)
      exitRecipeBtn.setVisible(false)
      spamTitle.setVisible(false)
      spamSteps.setVisible(false)
      directions.setVisible(false)
    });

    //on exit help button pushed
    exitHelpBtn.on('pointerdown', () => {
      helpPaper.setVisible(false)
      exitHelpBtn.setVisible(false)
      helpText.setVisible(false)
      directions.setVisible(false)
    });

    // ------------------------------------------- END POPUPS -------------------------------------------------

    } // end create function
    clickBack() {
        this.scene.restart(this);
        this.scene.switch("title-scene");
    }
    clickNext() {
        this.scene.restart(this)
        this.sceneCompletion?.play();
        this.scene.switch("musubi-scene-3");
      }
    clickCheckOrder(){
        const order: Array<Phaser.GameObjects.GameObject> = [
                    <Phaser.GameObjects.GameObject>this.step1,
                    <Phaser.GameObjects.GameObject>this.step2,
                    <Phaser.GameObjects.GameObject>this.step3,
                    <Phaser.GameObjects.GameObject>this.step4,
                    <Phaser.GameObjects.GameObject>this.step5,
                    <Phaser.GameObjects.GameObject>this.step6];
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