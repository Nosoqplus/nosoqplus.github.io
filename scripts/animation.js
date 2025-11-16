class AnimationObject{
    constructor(params, animateFunction){
        
        // PARAMETERS
        this.name = params.name ? params.name : Math.round(Math.random() * 10000);
        this.animationLength = params.animationLength ? params.animationLength : 1000;
        this.repeatable = params.repeatable ? params.repeatable : false;
        this.other = params.other ? params.other : undefined;

        
        // CORE ANIMATION FUNCTIONALITY
        this.animationStart = Date.now();
        this.animationEnd = this.animationStart + this.animationLength;
        
        this.animate = animateFunction;
        this.onAnimationEnd = params.onAnimationEnd ? params.onAnimationEnd : () => {}; 

        this.timesRepeated = 0;

        

        // PUTS ANIMATION TO ANIMATION ARRAY
        animationsArray.push(this);
    }
    
    tick(){
        this.animate();
        
        
        if(Date.now() >= this.animationEnd){
            // REMOVES ANIMATION IF IT ISN'T REPEATABLE
            if(!this.repeatable){
                this.stopAnimation();
            }else{
                // AND RESTARTS TIMER IF IT IS
                this.animationEnd = Date.now() + this.animationLength;
                this.timesRepeated++;
            }
        }
    }
    
    // REMOVES ANIMATION FROM ANIIMATIONSARRAY WHICH MEANS IT WON`T BE EXECUTED ANYMORE
    stopAnimation(){
        this.onAnimationEnd();
        animationsArray.splice(animationsArray.indexOf(this), 1);
    };
}

class GlitchAnimation extends AnimationObject{
    constructor(params){
        super(params);
        this.position = params.position;
        this.size = params.size;

        this.frameParams = {};

        this.animate = function(){
            // DISPLAYS CURRENT FRAMES
            if(this.frameParams){
                window.ctx.fillStyle = 'red';
                window.ctx.fillRect(this.frameParams.x, this.frameParams.y, this.frameParams.width, this.frameParams.height);
            }
            
            // CHANGES FRAMES
            if(Date.now() >= this.animationEnd){
                this.frameParams = {
                    x:(this.position.x + (Math.random() * this.size.width) - 0.1) * window.TILE,
                    y:(this.position.y + (Math.random() * this.size.height) - 0.1) *  window.TILE,
                    width: Math.random() * 10,
                    height: Math.random() * 10,
                }
                
                this.animationEnd += this.animationLength;
            }
        }
    }
}

class FadeIn extends AnimationObject{
    constructor(params){
        super(params);

        this.animate = function(){

            const gameWindowWidth = document.querySelector('canvas').offsetWidth;
            const gameWindowHeight =  document.querySelector('canvas').offsetWidth;

            window.ctx.fillStyle = 'black';
            window.ctx.fillRect(0, gameWindowHeight * ((this.animationEnd - Date.now()) / this.animationLength), gameWindowWidth, gameWindowWidth);

            // animationsArray.push(this);
        }
    }
}

// VARIABLES
let animationsArray = [];

const animationsDictionary = {
    glitch: GlitchAnimation,
    fadeIn: FadeIn,
};



// CREATES ANIMATION OBJECTS
window.createAnimation = function(params, callback){
    new AnimationObject(params, callback);
}

window.addAnimation = function(name, params) {
    const animationClass = animationsDictionary[name];
    new animationClass(params);
}



// RETURNS ANIMATION OBJECT BY NAME
window.getAnimationObject = function(animationName){
    const anim = animationsArray.filter(animation => {return animation.name === animationName})
    return anim[0];
}

// USED IN MAIN GAME`S THREAD
window.drawAnimations = function(){
    animationsArray.forEach(animation => {
        animation.tick();
    })
}