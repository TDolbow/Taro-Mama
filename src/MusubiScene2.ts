import Phaser from 'phaser'
import main from './main';
import { CheckPositions } from './CheckPositions';

export default class MusubiScene extends Phaser.Scene {
    //solution text
    private feedback_text : Phaser.GameObjects.Text | undefined;

    //pseudo code
    private step1 : Phaser.GameObjects.GameObject | undefined;
    private step2 : Phaser.GameObjects.GameObject | undefined;
    private step3 : Phaser.GameObjects.GameObject | undefined;
    private step4 : Phaser.GameObjects.GameObject | undefined;
    private step5 : Phaser.GameObjects.GameObject | undefined;
    private step6 : Phaser.GameObjects.GameObject | undefined;

    constructor() {
		super('musubi-scene-2')
	}

    preload() {
        //background
        this.load.image('table', 'assets/backgrounds/firstscene/table.png');
        this.load.image("brick", "assets/backgrounds/firstscene/brickBackground.jpg");
        this.load.image("check", "assets/buttons/checkmark.png");
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
        const scaledStep1 = this.add.text(50, 50, "step1;", {
            color: '0xff0000', fontSize: '58px', fontStyle: 'bold'
        }).setInteractive();
        scaledStep1.scale = 0.5;
        this.step1 = scaledStep1;
        this.input.setDraggable(this.step1);
        this.step1.name = 'step1';
        
        const scaledStep2 = this.add.text(50, 90, "step2;", {
            color: '0xff0000', fontSize: '58px', fontStyle: 'bold'
        }).setInteractive();
        scaledStep2.scale = 0.5;
        this.step2 = scaledStep2;
        this.input.setDraggable(this.step2);
        this.step2.name = 'step2';
        
        const scaledStep3 = this.add.text(50, 130, "step3;", {
            color: '0xff0000', fontSize: '58px', fontStyle: 'bold'
        }).setInteractive();
        scaledStep3.scale = 0.5;
        this.step3 = scaledStep3;
        this.input.setDraggable(this.step3);
        this.step3.name = 'step3';
        
        const scaledStep4 = this.add.text(50, 170, "step4;", {
            color: '0xff0000', fontSize: '58px', fontStyle: 'bold'
        }).setInteractive();
        scaledStep4.scale = 0.5;
        this.step4 = scaledStep4;
        this.input.setDraggable(this.step4);
        this.step4.name = 'step4';
        
        const scaledStep5 = this.add.text(50, 210, "step5;", {
            color: '0xff0000', fontSize: '58px', fontStyle: 'bold'
        }).setInteractive();
        scaledStep5.scale = 0.5;
        this.step5 = scaledStep5;
        this.input.setDraggable(this.step5);
        this.step5.name = 'step5';
        
        const scaledStep6 = this.add.text(50, 250, "step6;", {
            color: '0xff0000', fontSize: '58px', fontStyle: 'bold'
        }).setInteractive();
        scaledStep6.scale = 0.5;
        this.step6 = scaledStep6;
        this.input.setDraggable(this.step6);
        this.step6.name = 'step6';

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
            fontSize: '58px', fontStyle: 'bold',color:'0xff0000'
        });
        feedback_text.scale=0.5;
        this.feedback_text = feedback_text;
          
        const checkDirections = this.add.image(760, 480, 'check');
        checkDirections.displayWidth = Number(main.config.width) * .08;
        checkDirections.scaleY = checkDirections.scaleX;
        checkDirections.setInteractive({ useHandCursor: true });
        checkDirections.on('pointerdown', () => this.clickCheckOrder());
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
      }
}