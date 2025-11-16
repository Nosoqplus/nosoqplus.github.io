window.audio = {
    sounds: {},
    music: {}, 
} 

window.currentSong = 'BeachTheme';

const sounds = ['walk', 'use', 'dialog', 'zipper', 'water'];
const music = ['FrogTheme', 'BreakCore1', 'BeachTheme', 'SadSong', 'ForestTheme', 'DungeonTheme', 'MrPenisTheme'];

function loadSounds(){
    sounds.forEach(sound => {
        const soundObj = new Audio(`./sound/${sound}.wav`);
        soundObj.volume = 0.1;
        audio.sounds[sound] = soundObj;
    })
}

function loadMusic(){
    music.forEach(music => {
        const musicObj = new Audio(`./music/${music}.mp3`);
        musicObj.volume = 0.1;
        musicObj.onended = () => {
            window.audio.music[currentSong].play();
        };
        audio.music[music] = musicObj;
    })
}

window.setMusic = function(songName){
    if(! (window.currentSong === songName)){
        window.currentSong = songName;
    }
}

window.forceMusicChange  = function(){
    for (let songName in window.audio.music){
        if(! (songName === window.currentSong)){
            let song = window.audio.music[songName];
            song.pause();
            song.currentTime = 0;
        }
    }
    window.audio.music[window.currentSong].play();
}


// ON LOAD
loadSounds();
loadMusic();

