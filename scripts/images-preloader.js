const TILESET_1_LENGTH = 64;

// THIS SCRIPT CREATES AN OBJECT THAT CONTAINS EVERY IMG IN FORM OF HTMLIMAGE OBJECTS 
// FOR EASIER USE

window.everyImageLoaded = false;
let imagesLoaded = 0;
let imagesToLoad = 0;

window.images = {
    tileset_1: {},
    entities: {},
    dialogFaces: {},
    battle: {},
    other: {},
} 

const PLAYER_STATES = ['up', 'down', 'left', 'right'];
const PLAYERS = ['larry', 'ml', 'mrpenis', 'cultist', 'arsen'];
const OTHER = ['letter', 'bag'];



function checkImagesLoad(){
    if(imagesToLoad === imagesLoaded){
        window.everyImageLoaded = true;
        console.log('images loaded!');
    }
}

function onImageLoad(){
    imagesLoaded++;
    checkImagesLoad();
}

function loadTiles(){
    for(let i = 1; i <= TILESET_1_LENGTH ;i++){
        imagesToLoad++;
        
        const img = new Image();
        img.src = `./img/tiles/${i}.jpg`;
        img.onload = onImageLoad;
        
        window.images.tileset_1[i] = img;
    }
    
}

function loadPlayers(){
    PLAYERS.forEach(player => {
        imagesToLoad++;

        const playerObj = {};
        
        PLAYER_STATES.forEach(state =>{
            const img = new Image();
            img.src = `./img/players/${player}-${state}.png`;
            img.onload = onImageLoad;

            playerObj[state] = img;
            
        })
        window.images.entities[player] = playerObj;
    })
}



function loadDialogFaces(){
    // PLAYERS
    PLAYERS.forEach(player => {
        imagesToLoad++;

        const img = new Image();
        img.src = `./img/faces/${player}.png`;
        img.onload = onImageLoad;

        window.images.dialogFaces[player] = img;
    })
}

function loadOther(){
    OTHER.forEach(other => {
        imagesToLoad++;

        const img = new Image();
        img.src = `./img/other/${other}.png`;
        img.onload = onImageLoad;

        window.images.other[other] = img;
    })
}


// ON LOAD
loadTiles();
loadPlayers();
loadDialogFaces();
loadOther();

console.log(window.images);



