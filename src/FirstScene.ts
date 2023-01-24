import Phaser from 'phaser'
import main from './main';

export default class FirstScene extends Phaser.Scene {
    private rice : Phaser.GameObjects.GameObject | undefined;
    private seaweed : Phaser.GameObjects.GameObject | undefined;
    private spam : Phaser.GameObjects.GameObject | undefined;

	constructor() {
		super('first-scene')
	}
preload() {
    this.load.image("rice", "assets/ingredients/rice.png");
    this.load.image("seaweed", "assets/ingredients/seaweed.png");
    this.load.image("spam", "assets/ingredients/spam.png");
    this.load.image('list', 'assets/backgrounds/titlescene/ingredientList.png')
    this.load.image('table', 'assets/backgrounds/titlescene/table.png')

    //for recipe help button
    this.load.image('recipe', 'assets/buttons/recipeBook.png')
    
    //for direction help button 
    this.load.image('help', 'assets/buttons/help.png')

    //for recipe popup
    this.load.image('exit', 'assets/buttons/exit.png')
}
create() {
    //ingrediet list
    const scaledList = this.physics.add.image(100, 125, 'list');
    scaledList.displayWidth = Number(275);
    scaledList.scaleY = scaledList.scaleX;

    //table
    const scaledTable = this.physics.add.image(400, 550, 'table')
    scaledTable.displayWidth = Number(700)
    scaledTable.scaleY = scaledTable.scaleX
    
    //rice
    const scaledRice = this.physics.add.image(this.scale.width / 2, this.scale.height / 2, "rice").setInteractive();
    scaledRice.displayWidth = Number(main.config.width) * .2;
    scaledRice.scaleY = scaledRice.scaleX;
    this.rice = scaledRice;
    this.input.setDraggable(this.rice);

    //seaweed
    const scaledSeaweed = this.physics.add.image(this.scale.width / 3, this.scale.height / 3, "seaweed").setInteractive();
    scaledSeaweed.displayWidth = Number(main.config.width) * .12;
    scaledSeaweed.scaleY = scaledSeaweed.scaleX;
    this.seaweed = scaledSeaweed;
    this.input.setDraggable(this.seaweed);

    //spam
    const scaledSpam = this.physics.add.image(this.scale.width / 4, this.scale.height / 4, "spam").setInteractive();
    scaledSpam.displayWidth = Number(main.config.width) * .15;
    scaledSpam.scaleY = scaledSpam.scaleX;
    this.spam = scaledSpam;
    this.input.setDraggable(this.spam);

    //drag n drop 
    this.input.dragDistanceThreshold = 16;
    this.input.on('dragstart', function (_pointer: any, gameObject: { setTint: (arg0: number) => void; }) {
      gameObject.setTint(0xff0000);
    });
    this.input.on('drag', function (_pointer: any, gameObject: { x: number; y: number; }, dragX: number, dragY: number) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });
    this.input.on('dragend', function (_pointer: any, gameObject: { clearTint: () => void; }) {
      gameObject.clearTint();
    });

    //recipe help button
    const recipeBtn = this.add.image(125,535, "recipe");
    recipeBtn.scale = .125;
    recipeBtn.setInteractive({ useHandCursor: true });
    
    //direction help button
    const helpBtn = this.add.image(200, 540, "help")
    helpBtn.scale = .075
    helpBtn.setInteractive({ useHandCursor: true });

    //for recipe popup
    const recipePaper = this.add.image(75,0, "list")
    recipePaper.setOrigin(0,0)
    recipePaper.scale = .9
    recipePaper.setVisible(false)

    const exitRecipeBtn = this.add.image(550,100, "exit")
    exitRecipeBtn.scale = .1
    exitRecipeBtn.setInteractive({ useHandCursor: true });
    exitRecipeBtn.setVisible(false)

    const spamText = this.add.text(125,100,`Spam Musubi Recipe \n 
      Step 1: Slice spam into 8-10 slices. Mix oyster sauce, soy sauce, and sugar until sugar is dissolved and marinate with the SPAM. \n
      Step 2: Drain off marinade and fry SPAM on each side over medium heat until slightly crispy or until desired doneness. \n
      Step 3: Place a strip of nori on a cutting board or clean surface (shiny side down). Place your Musubi mold across the middle of the nori. Add Sushi Rice to the mold. \n
      Step 4: Next, remove the mold from the rice. Now you will have a nice little block of rice right on the nori. Add some of the cooked SPAM to the top. Wrap up one side of the nori and stick it to the top of the SPAM, then wrap up the other side.
            
      `)
    spamText.setVisible(false)

    //for help popup
    const exitHelpBtn = this.add.image(550,100, "exit")
    exitHelpBtn.scale = .1
    exitHelpBtn.setInteractive({ useHandCursor: true });
    exitHelpBtn.setVisible(false)

    const helpText = this.add.text(300,100,"Directions")
    helpText.setVisible(false)

    //on recipe button pushed
    recipeBtn.on('pointerdown', (event: MouseEvent) => {
      recipePaper.setVisible(true)
      exitRecipeBtn.setVisible(true)
      spamText.setVisible(true)

    });

    //on help button pushed
    helpBtn.on('pointerdown', (event: MouseEvent) => {
      recipePaper.setVisible(true)
      exitHelpBtn.setVisible(true)
      helpText.setVisible(true)

    });

    //on exit recipe button pushed
    exitRecipeBtn.on('pointerdown', (event: MouseEvent) => {
      recipePaper.setVisible(false)
      exitRecipeBtn.setVisible(false)
      spamText.setVisible(false)

    });

    //on exit help button pushed
    exitHelpBtn.on('pointerdown', (event: MouseEvent) => {
      recipePaper.setVisible(false)
      exitHelpBtn.setVisible(false)
      helpText.setVisible(false)

    });




}
}