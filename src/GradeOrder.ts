import Phaser from 'phaser';
import main from './main';

export default class GradeOrder extends Phaser.Scene{
    private instruction1 : Phaser.GameObjects.GameObject | undefined;
    private instruction2 : Phaser.GameObjects.GameObject | undefined;
    private instruction3 : Phaser.GameObjects.GameObject | undefined;
    private instruction4 : Phaser.GameObjects.GameObject | undefined;
    private instruction5 : Phaser.GameObjects.GameObject | undefined;

    private correctText : Phaser.GameObjects.Text | undefined;

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
        
        //Load play button
        this.load.image("play","assets/backgrounds/titlescene/playText.png");

        //Load scroll
        this.load.image('scroll',"assets/backgrounds/titlescene/ingredientList.png")
    }

    create(){
        //Creates an area that will contain the ordered instructions 
        const IngredientsLandingZone = this.physics.add.image(100, 125, 'scroll');
        //IngredientsLandingZone.displayWidth = Number(main.config.width) * .2;

        //Creates Instruction 1 object
        const instruction1 = this.physics.add.image(IngredientsLandingZone.displayWidth, Number(main.config.height) * 0.1, "instruction1");
        instruction1.setInteractive();
        instruction1.displayWidth = Number(main.config.width) * 0.5;
        instruction1.displayHeight = Number(main.config.height) * 0.1;
        this.instruction1 = instruction1;
        this.instruction1.name = 'Instruction 1'

        
        this.input.setDraggable(this.instruction1);

        //Creates Instruction 2 object
        const instruction2 = this.physics.add.image(IngredientsLandingZone.displayWidth, Number(main.config.height) * 0.1, "instruction2");
        instruction2.setInteractive();
        instruction2.displayWidth = Number(main.config.width) * 0.5;
        instruction2.displayHeight = Number(main.config.height) * 0.1;
        this.instruction2 = instruction2;
        this.instruction2.name = 'Instruction 2'


        
        this.input.setDraggable(this.instruction2);

        //Creates Instruction 3 object
        const instruction3 = this.physics.add.image(IngredientsLandingZone.displayWidth, Number(main.config.height) * 0.1, "instruction3");
        instruction3.setInteractive();
        instruction3.displayWidth = Number(main.config.width) * 0.5;
        instruction3.displayHeight = Number(main.config.height) * 0.1;
        this.instruction3 = instruction3;
        this.instruction3.name = 'Instruction 3'


        
        this.input.setDraggable(this.instruction3);

        //Creates Instruction 4 object
        const instruction4 = this.physics.add.image(IngredientsLandingZone.displayWidth, Number(main.config.height) * 0.1, "instruction4");
        instruction4.setInteractive();
        instruction4.displayWidth = Number(main.config.width) * 0.5;
        instruction4.displayHeight = Number(main.config.height) * 0.1;
        this.instruction4 = instruction4;
        this.instruction4.name = 'Instruction 4'

        
        this.input.setDraggable(this.instruction4);



        //Creates Instruction 5 object
        const instruction5 = this.physics.add.image(IngredientsLandingZone.displayWidth, Number(main.config.height) * 0.1, "instruction5");
        instruction5.setInteractive();
        instruction5.displayWidth = Number(main.config.width) * 0.5;
        instruction5.displayHeight = Number(main.config.height) * 0.1;
        this.instruction5 = instruction5;
        this.instruction5.name = 'Instruction 5'



        this.input.setDraggable(this.instruction5);

       // this.correctText = new Phaser.GameObjects.Text(500,500,"The button has not been clicked",{});

       this.correctText = this.add.text(16,16,'Click the Button To Determine If The Instructions Are In The Correct Order',{
        fontSize: '16px',
        fill: '#ffffff'
    });


        
        
        //Enables movement on drag
        this.input.on('drag', function (_pointer: any, gameObject: { x: number; y: number; }, dragX: number, dragY: number) {
            gameObject.x = dragX;
            gameObject.y = dragY;
          });

          //play button
		const scaledPlay = this.add.image(600, 450, "play"); //1280 800
		scaledPlay.displayWidth = Number(main.config.width) * 0.2;
		scaledPlay.displayHeight = Number(main.config.width) * 0.2;
        scaledPlay.setInteractive({ useHandCursor: true });
        scaledPlay.on('pointerdown', () => this.CheckPositions());

}

CheckPositions(){

    this.correctText?.setText("The button has been clicked.");

    //Make sure the instructions are in the correct order here. 
    const objectsToCheck = [this.instruction1,this.instruction2,this.instruction3,this.instruction4,this.instruction5];

    for(var i = 0; i < objectsToCheck.length-1; i = i + 1){
        if(Number(objectsToCheck[i]?.body.position.y) > Number(objectsToCheck[i+1]?.body.position.y)){
            this.correctText?.setText(`The instruction ${objectsToCheck[i]?.name} is out of order. Please try again.`);
            return;
        }
        this.correctText?.setText('All instructions are in the correct location');

    }
    
    



}


        
}

    