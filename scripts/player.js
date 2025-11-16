// VARIABLES

let playerState = 'down';

let playerCoords = {
    x: 15,
    y: 19,
}

let PLAYER_SIZE = {
    width: 16,
    height: 16,
}

const CONTROLS = {
    up: ['w', 'ц'],
    down: ['s', 'ы'],
    left: ['a', 'ф'],
    right: ['d', 'в'],
    use: [' '],
    pause: ['Escape'],
}


window.getPlayerPosition = function (){

    // ALSO RETURN CURRENT PLAYER POSITION
    return playerCoords;

}

// USED IN MAIN GAME THREAD
window.drawPlayer = function(){
    // CHECKS IF ALL IMAGES LOADED
    if(window.everyImageLoaded === false){
        return;
    }
    
    // DRAWS SPRITE
    const currentPlayerSprite = window.images.entities.larry[playerState];
    window.ctx.drawImage(currentPlayerSprite, playerCoords.x * window.TILE, playerCoords.y * window.TILE);
    
}



// PLAYER CONTROLS
function playerControls(evt){
    const key = evt.key;
    
    // CHECKS IF PLAYER PRESSED THE MOVEMENT KEYS
    if(CONTROLS.up.includes(key) ||  CONTROLS.down.includes(key) ||  CONTROLS.left.includes(key) ||  CONTROLS.right.includes(key)){
        // This long argument used to get the string which tells the direction: 'up', 'down' etc 
        window.movePlayer(...Object.keys(CONTROLS).filter(direction => {return CONTROLS[direction].includes(key)}));
    }
}

// PLAYER INTERACTION LOGIC
function checkEnvironmentInteraction(playerMoveCoords){
    let interactablesEntered = []

    // CHECKS INTERACTABLES IN MAP OBJECT AND EXECUTES ACTION IT CONTAINS
    for(let interactable in window.currentMap.interactables){
        // Gets interactable object into variable for easier use
        interactable = window.currentMap.interactables[interactable];
        
        const interactableWidth = interactable.width ? interactable.width : 0;
        const interactableHeight = interactable.height ? interactable.height : 0;
        
        // Checks if player tried to enter interactable
        if(interactable.x <= playerMoveCoords.x && playerMoveCoords.x <= interactable.x + interactableWidth
            && 
            interactable.y <= playerMoveCoords.y && playerMoveCoords.y <= interactable.y + interactableHeight){
                interactablesEntered.push(interactable);
            }
        }
        
        interactablesEntered.forEach(interactable => {
            interactable.onInteract();
            window.audio.sounds.use.play();
    })

}

function noInteraction(xCoord, yCoord){
    let interacted;
    
    for(let interactable in window.currentMap.interactables){
        // Gets interactable object into variable for easier use
        interactable = window.currentMap.interactables[interactable];
        
        const interactableWidth = interactable.width ? interactable.width : 0;
        const interactableHeight = interactable.height ? interactable.height : 0;
        
        
        // Checks if player tried to enter interactable
        if(interactable.x <= xCoord && xCoord <= interactable.x + interactableWidth
            && 
            interactable.y <= yCoord && yCoord <= interactable.y + interactableHeight){
                interacted = true;
            }
    }

    return !interacted;
}

window.movePlayer = function(direction, xCoord, yCoord){
    // Changes player`s sprite
    playerState = direction;
    
    
    // SETS PLAYER POSITION TO ARGUMENT`S COORD IF THERE ARE ANY
    if(xCoord || yCoord){
        playerCoords = {
            x: xCoord === 'default' ? playerCoords.x : xCoord,
            y: yCoord === 'default' ? playerCoords.y : yCoord,
        }
        
        return;
    }

    // Decides where player next move goes
    let nextMoveCoords = {
        x: playerCoords.x,
        y: playerCoords.y,
    }

    if(direction === 'up'){
        nextMoveCoords['y'] = nextMoveCoords['y'] - 1;
    }
    if(direction === 'down'){
        nextMoveCoords['y'] = nextMoveCoords['y'] + 1;
    }
    if(direction === 'right'){
        nextMoveCoords['x'] = nextMoveCoords['x'] + 1;
    }
    if(direction === 'left'){
        nextMoveCoords['x'] = nextMoveCoords['x'] - 1;
    }
    

    // CHEKING INTERACTIONS AND COLLISION
    // KEEP IF STATEMENTS IN THIS SPECIFIC ORDER
    // OTHERWISE PLAYER TELEPORTATION DOESN`T WORK PROPERLY
    if(!window.isSolid(nextMoveCoords.x, nextMoveCoords.y) && noInteraction(nextMoveCoords.x, nextMoveCoords.y) && !insideDialog){
        
        playerCoords = nextMoveCoords; 
        window.audio.sounds.walk.play();
    }

    if(!window.insideDialog){
        checkEnvironmentInteraction(nextMoveCoords);
    }
    
    

    return playerCoords;  
}



// ON LOAD
window.addEventListener('keyup', playerControls);