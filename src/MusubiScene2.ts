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

    //random placement parameters
    private randomxMin : integer;
    private randomxMax : integer;
   
    private randomyMin : integer;
    private randomyMax : integer;
    private yIncrement : integer;
    private possibleYSteps : integer[];



    


    constructor() {
		super('musubi-scene-2')
        
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
        //musubi
        this.load.image("musubi", "assets/ingredients/musubi.png");
    }
    create() {
        //background 
        const scaledbackground = this.add.image(400, 300, "brick");
        scaledbackground.displayWidth = Number(main.config.width);
        scaledbackground.displayHeight = Number(main.config.height);

        //table
        const scaledTable = this.physics.add.image(400, 550, 'table')
        scaledTable.displayWidth = Number(700)
        scaledTable.scaleY = scaledTable.scaleX

        //recipe directions 

        var tempStep = Phaser.Math.Between(0,this.possibleYSteps.length-1);
        console.log(this.possibleYSteps);
        console.log(this.possibleYSteps[tempStep])

        const scaledStep1 = this.add.text(50, this.possibleYSteps[tempStep], "Slice the spam", {
            color: '0x000000', fontSize: '58px', fontStyle: 'bold'
        }).setInteractive();
        this.possibleYSteps.splice(tempStep,1);
        scaledStep1.scale = 0.5;
        this.step1 = scaledStep1;
        this.input.setDraggable(this.step1);
        this.step1.name = 'Slice the...';
        
        var tempStep = Phaser.Math.Between(0,this.possibleYSteps.length-1);
        
        console.log(this.possibleYSteps);
        console.log(this.possibleYSteps[tempStep])

        const scaledStep2 = this.add.text(50, this.possibleYSteps[tempStep], "Cook the spam", {
            color: '0x000000', fontSize: '58px', fontStyle: 'bold'
        }).setInteractive();
        this.possibleYSteps.splice(tempStep,1);
        scaledStep2.scale = 0.5;
        this.step2 = scaledStep2;
        this.input.setDraggable(this.step2);
        this.step2.name = 'Cook the...';
        
        var tempStep = Phaser.Math.Between(0,this.possibleYSteps.length-1);

        console.log(this.possibleYSteps);
        console.log(this.possibleYSteps[tempStep])

        const scaledStep3 = this.add.text(50, this.possibleYSteps[tempStep], "make musubi mold with rice", {
            color: '0x000000', fontSize: '58px', fontStyle: 'bold'
        }).setInteractive();
        this.possibleYSteps.splice(tempStep,1);
        scaledStep3.scale = 0.5;
        this.step3 = scaledStep3;
        this.input.setDraggable(this.step3);
        this.step3.name = 'make musubi...';
        
        var tempStep = Phaser.Math.Between(0,this.possibleYSteps.length-1);

        console.log(this.possibleYSteps);
        console.log(this.possibleYSteps[tempStep])

        const scaledStep4 = this.add.text(50, this.possibleYSteps[tempStep], "remove extra rice from musubi mold", {
            color: '0x000000', fontSize: '58px', fontStyle: 'bold'
        }).setInteractive();
        this.possibleYSteps.splice(tempStep,1);
        scaledStep4.scale = 0.5;
        this.step4 = scaledStep4;
        this.input.setDraggable(this.step4);
        this.step4.name = 'remove extra...';
        
        var tempStep = Phaser.Math.Between(0,this.possibleYSteps.length-1);

        console.log(this.possibleYSteps);
        console.log(this.possibleYSteps[tempStep])

        const scaledStep5 = this.add.text(52,this.possibleYSteps[tempStep], "add cooked spam to rice mold", {
            color: '0x000000', fontSize: '58px', fontStyle: 'bold'
        }).setInteractive();
        this.possibleYSteps.splice(tempStep,1);
        scaledStep5.scale = 0.5;
        this.step5 = scaledStep5;
        this.input.setDraggable(this.step5);
        this.step5.name = 'add cooked...';
        var tempStep = Phaser.Math.Between(0,this.possibleYSteps.length-1);

        console.log(this.possibleYSteps);
        console.log(this.possibleYSteps[tempStep])

        const scaledStep6 = this.add.text(50, this.possibleYSteps[tempStep], "wrap spam & rice in nori", {
            color: '0x000000', fontSize: '58px', fontStyle: 'bold'
        }).setInteractive();
        this.possibleYSteps.splice(tempStep,1);
        scaledStep6.scale = 0.5;
        this.step6 = scaledStep6;
        this.input.setDraggable(this.step6);
        this.step6.name = 'wrap spam...';

        const scaledMusubi = this.add.image(400, 540, "musubi");
        scaledMusubi.displayWidth = Number(main.config.width) * .2;
        scaledMusubi.scaleY = scaledMusubi.scaleX;

        //sounds
        const click_sound = this.sound.add("clicksound", {
            volume: .3
        })

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
            fontSize: '50px', fontStyle: 'bold',color:'0xff0000'
        });
        feedback_text.scale=0.5;
        this.feedback_text = feedback_text;
          
        const checkDirections = this.add.image(760, 480, 'check');
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

    }
    clickNext() {
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