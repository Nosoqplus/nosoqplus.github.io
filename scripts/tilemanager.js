// DRAWS MAP ON CANVAS
window.drawMap = async function(map){   
    if(window.everyImageLoaded ===false){
        return;
    }


    // LINE LOOP
    for(let lineNumber = 0; lineNumber < map.tiles.length; lineNumber++){
        // BLOCK LOOP
        for(let blockNumber = 0; blockNumber < map.tiles[lineNumber].length; blockNumber++ ){
            const tileIndex = map.tiles[lineNumber][blockNumber];
            window.ctx.drawImage(window.images.tileset_1[tileIndex], blockNumber * 16 , lineNumber * 16, 16, 16);

            
        }
    }

    map.onUpdate();

}
