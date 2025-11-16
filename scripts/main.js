
// CONSTANTS
const FRAMES_PER_SECOND = 24;
window.TILE = 16;

const BATTLE_SCREEN_SIZE = {x: 480, y: 120}

// CANVAS AND CONTEXT
const canvas = document.querySelector('canvas');
window.ctx = canvas.getContext('2d');
window.gameScreenSize = {
    width: 0,
    height: 0,
}

window.setCanvasSize = function (widthArg, heightArg){
    const width = widthArg ? widthArg : window.currentMap.tiles[0].length * window.TILE;
    const height =  heightArg ? heightArg : window.currentMap.tiles.length * window.TILE ;
    
    canvas.width = width ;
    canvas.height = height;
}


// GAME TICK
// USED AS MAIN GAME THREAD

// GAME SETTINGS
window.currentMap = window.maps.forest1;


window.changeMap = function(newMap){
    // DISPLAYS MAP
    window.currentMap = window.maps[newMap];
    window.setCanvasSize();

    // EXECUTES INITIAL LOAD CALLBACK
    window.currentMap.onInitialLoad();
    
}


// IF GRAPHICS ADDED, SORT LAYERS BY CHANGING FUNCTIONS RUN ORDER
function gameTick(){

    window.drawMap(window.currentMap);
    window.drawPlayer();
    window.drawAnimations();


}


// ON LOAD
let gameUpdate = setInterval(gameTick, FRAMES_PER_SECOND / 1000);

window.setCanvasSize();
window.addEventListener('resize', () => {
    setCanvasSize();
});


// GAME START
window.changeMap('beach1');
window.movePlayer('down', 13, 3);
window.setMusic('BeachTheme');

window.addEventListener('keydown', ()=> {
    window.forceMusicChange();

})
