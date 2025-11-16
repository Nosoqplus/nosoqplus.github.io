class Phrase {
    constructor(text, author, onPhraseEnd){
        this.text = text;
        this.author = author;
        if(window.images.dialogFaces[author]){
            this.authorImage = window.images.dialogFaces[author];
        }

        this.onPhraseEnd = onPhraseEnd ? onPhraseEnd : undefined;
    }
}

let dialogQueue = [];
window.insideDialog = false;

// ANIMATION
let textAnimationInterval;
const LETTER_APPEAR_SPEED = 50;


// DOM ELEMENTS
const dialogTextEl = document.querySelector('.dialog-text');
const dialogFaceEl = document.querySelector('.dialog-face');
const dialogContainer = document.querySelector('.dialog-container');


function addText(textEl, text){
    const letterArray = Array.from(text);
    let currentLetter = 0;

    textAnimationInterval = setInterval(addLetter, LETTER_APPEAR_SPEED);

    function addLetter(){
        if(currentLetter < letterArray.length){
            textEl.textContent += letterArray[currentLetter];
            currentLetter++;
        }
        
    }
}

function onWindowClick(){
    // IF INSIDE DIALOG, CHANGES DIALOG PHRASE
    if(window.insideDialog){
        updateDialogWindow();
    }
}

function updateDialogWindow(){
    // UPDATES TEXT DISPLAYED ON DIALOG WINDOW
    if(dialogQueue[0]){

        // ENABLES DIALOG CONTAINER
        dialogContainer.style.display = 'flex';
        
        
        // REMOVES OLD TEXT OR PREVENTS IT FROM APPEARING
        clearInterval(textAnimationInterval);
        dialogTextEl.textContent = '';
        
        // DISPLAYS NEW TEXT
        addText(dialogTextEl, dialogQueue[0].text);
        
        // DISPLAYS FACES
        if(dialogQueue[0].author){
            dialogFaceEl.style.display = 'block';
            dialogFaceEl.src = `./img/faces/${dialogQueue[0].author}.png`;
        }else{
            dialogFaceEl.style.display = 'none';
        }
        
        // REMOVES PHRASE FROM QUEUE AND STARTS ONPHRASEEND FUNCTION;
        if(dialogQueue[0].onPhraseEnd){
            dialogQueue[0].onPhraseEnd();
        }

        dialogQueue.shift();

        window.audio.sounds.dialog.play();
        
    }else{
        // DIALOG FINISH
        
        // REMOVES TEXT
        clearInterval(textAnimationInterval);
        dialogTextEl.textContent = '';
        dialogFaceEl.style.display = 'none';
        
        
        window.insideDialog = false;
        // DISABLES DIALOG CONTAINER
        dialogContainer.style.display = 'none';
    }
}

window.addPhraseToQueue =  function(text, author, callback){
    // MANAGES DIALOG QUEUE
    const phrase = new Phrase(text, author, callback);
    dialogQueue.push(phrase);
    
    // DISPLAYES FIRST DIALOG PHRASE
    if(!window.insideDialog){
        updateDialogWindow();
    }

    window.insideDialog = true;
}

window.addEventListener('click', onWindowClick)