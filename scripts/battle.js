class Skill {
    constructor(params){
        this.type = params.type;
        this.action = params.action;
        this.phrase = params.phrase;
    }
}

class Enemy{
    constructor(params){
        this.type = params.type;
        this.lvl = params.lvl;
        
        this.maxHP = params.maxHp;
        this.currentHP = params.maxHP;

        this.damage = params.damage;
        this.speed = params.speed;

        this.skillSet = params.skillSet;
        this.actionFunction = params.actionFunction ? params.actionFunction : undefined;

        this.img = window.images.battle[this.type] ? window.images.battle[this.type] : window.images.battle['osaka'];

    }

    Act(){
        let healingActionChance = 0; 
        enemiesArray.forEach(enemie => {
            if(enemie.currentHP < enemie.maxHP){
                healingActionChance = healingActionChance === 0 ? 1 * (enemie.currentHP / enemie.maxHP) : healingActionChance * (enemie.currentHP / enemie.maxHP);
            }
        })

        // On chance succeed
        if(healingActionChance > Math.random()){
            for(skill in this.skillSet){
                if(skill.type === 'heal'){
                    skill.action;
                    return;
                }
            }
        };

        let randomSkillIndex = Math.round(Math.random() * this.skillSet.length);
        
        console.log(Math.round(Math.random() * this.skillSet.length));
        console.log(this.skillSet[randomSkillIndex]);

        this.skillSet[randomSkillIndex].action();
        // window.addPhraseToQueue(this.skillSet[randomSkillIndex].phrase);

    }
}




const canvas = document.querySelector('canvas');

// USED TO CONTROL GAME LOGIC
window.insideBattle = false;

// ENEMIES THAT ARE IN CURRENT BATLLE
let enemiesArray = [];

// USED IN MAIN GAME`S THREAD
window.drawBattleScreen = function(){
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    window.ctx.fillRect(0,0, canvasWidth, canvasHeight);

    enemiesArray.forEach(enemy => {

        enemy.xPosition = (canvasWidth / ( enemiesArray.length + 1)) * (enemiesArray.indexOf(enemy) + 1)  - enemy.img.width / 2;
        
        window.ctx.drawImage(enemy.img, enemy.xPosition, (canvasHeight / 2) - enemy.img.height / 2 );
    });

}


window.enterBattle = function (enemiesParams){
    document.querySelector('.canvas-container').classList.add('battle');
    
    window.addAnimation('fadeIn', {name: "enterBattleFadeIn", animationLength: 3000, onAnimationEnd: () => {
        // USED TO CHANGE GAME BEHAVIOUR IN DIFFERENT PLACES
        window.insideBattle = true;
        
        
        enemiesParams.forEach(enemyParam => {
            const enemy = new Enemy(enemyParam);

            enemiesArray.push(enemy);
        });

    }})
}



window.enterBattle([
    {
    type: 'osaka',
    maxHp: 200,
    lvl: 3,
    skillSet: [
        new Skill ({
            type: 'attack', 
            action: function(){console.log(this.type + 'attacked played')}, 
            phrase: 'Hi'
        }),
        new Skill ({
            type: 'heal', 
            action: function(){console.log(this.type + 'healed ally')}, 
            phrase: 'Hi2'
        }),
    ]
    },
])
