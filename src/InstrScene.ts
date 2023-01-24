import Phaser from 'phaser'

export default class InstrScene extends Phaser.Scene {
	constructor() {
		super('instr-scene')
	}
preload() {
    //preload here
}
create() {
    //create here
    this.add.text(200, 300, "instruction scene - will implement later", {
        color: '0x000000'
    });
}
}