import Phaser from 'phaser';
import main from './main';

export default class GradeOrder extends Phaser.Scene{
    private instruction1 : Phaser.GameObjects.GameObject | undefined;
    private instruction2 : Phaser.GameObjects.GameObject | undefined;
    private instruction3 : Phaser.GameObjects.GameObject | undefined;
    private instruction4 : Phaser.GameObjects.GameObject | undefined;
    private instruction5 : Phaser.GameObjects.GameObject | undefined;

    constructor(){
        super('GradeOrder');
    }
    preload(){
        //Load the five temporary instruction objects
        this.load.image("instruction1", "assets/RecipeInstructions/Instruction1.png");
        this.load.image("instruction2", "assets/RecipeInstructions/Instruction2.png");
        this.load.image("instruction3", "assets/RecipeInstructions/Instruction3.png");
        this.load.image("instruction4", "assets/RecipeInstructions/Instruction4.png");
        this.load.image("instruction5", "assets/RecipeInstructions/Instruction5.png");
    }

    create(){
        //Creates an area that will contain the ordered instructions 
        const IngredientsLandingZone = this.physics.add.image(100, 125, 'list');
        IngredientsLandingZone.displayWidth = Number(main.config.width) * .2;

        //Creates Instruction 1 object
        this.instruction1 = this.physics.add.image(IngredientsLandingZone.displayWidth, Number(main.config.height) * 0.1, "instruction1");
        this.instruction1.setInteractive();
        this.input.setDraggable(this.instruction1);


        //Enables movement on drag
        this.input.on('drag', function (_pointer: any, gameObject: { x: number; y: number; }, dragX: number, dragY: number) {
            gameObject.x = dragX;
            gameObject.y = dragY;
          });


        
    }

}