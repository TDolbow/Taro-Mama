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

    //zones
    //private zone1 : Phaser.GameObjects.Zone | undefined;

    constructor() {
		super('musubi-scene-3')
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
        //background 
        const scaledbackground = this.add.image(400, 300, "brick");
        scaledbackground.displayWidth = Number(main.config.width);
        scaledbackground.displayHeight = Number(main.config.height);

        //table
        const scaledTable = this.physics.add.image(400, 550, 'table')
        scaledTable.displayWidth = Number(700)
        scaledTable.scaleY = scaledTable.scaleX

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

        /*
        //back button
        const back = this.add.text(10, 500, "Quit", {
            fontSize: '58px'
            });
        back.setTint(0xFF0000);
        back.displayWidth = Number(main.config.width) * .1;
        back.scaleY = back.scaleX;
        back.setInteractive({ useHandCursor: true });
        back.on('pointerdown', () => this.clickBack());
        */

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
        this.poptext = this.add.text(230, 150, "GREAT JOB!", {
            fontSize: '58px', fontStyle: 'bold', color: '0x000000'
        });
        this.poptext.setVisible(false);
        this.arrow = this.add.image(400, 350, 'arrow');
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
    }
    clickFinish() {
        this.scene.restart(this)
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