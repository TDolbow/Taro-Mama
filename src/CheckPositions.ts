import Phaser from 'phaser';

export function CheckPositions(name_order: Phaser.GameObjects.GameObject[]){
    //Make sure the instructions are in the correct order here. 
    const objectsToCheck = name_order;
    //console.log(objectsToCheck);
    for(let i = 0; i < objectsToCheck.length-1; i +=  1){
        if(Number(objectsToCheck[i]?.y) > Number(objectsToCheck[i+1]?.y)){
           return (String(`The instruction ${objectsToCheck[i]?.name} is out of order.`));
        }
        //console.log(`${objectsToCheck[i].name} y: ${objectsToCheck[i].y}`);
    }
    return (String('All instructions are in the correct location'));
}