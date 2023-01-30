/*
This component contains the checkPositions method, which checks the order of components against the expected order. 
The array of objects passed in are in the expected order, and this method will check the proper order via the pass-by-reference
property of objects in typescript. If the order is incorrect, this method will return a string that contains the incorrect command
for feedback purposes. Otherwise, this method returns the string: `The instruction ${name_order[i]?.name}\nis out of order.`

*/

import Phaser from 'phaser';

export function CheckPositions(name_order: any[]){ 
    const name_order_copy = name_order;

    //Sort elements by their y value.
    const sortedByHeight:Phaser.GameObjects.GameObject[] = name_order_copy.slice(0).sort((n1,n2) =>{
        if(n1.y > n2.y){
            return(1);
        }
        if(n1.y < n2.y){
            return(-1);
        }
        return(0);
    }
    )

    //Starting comparison

    for(let i = 0; i < name_order.length; i += 1){
        if(name_order[i].name !== sortedByHeight[i].name){    
            return(String(`The instruction ${name_order[i]?.name}\nis out of order.`));
        }
    }
    return (String('All instructions are in\nthe correct location'));
}