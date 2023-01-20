import Phaser from 'phaser'

export default class FirstScene extends Phaser.Scene {
	constructor() {
		super('first-scene')
	}
preload() {
    //preload here
}
create() {
    //create here
    this.add.circle(400, 300, 50, 0xff0000);
}
}