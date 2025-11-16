const hpTextEl = document.querySelector('.hp-stat');
const lvlTextEl = document.querySelector('.lvl-stat');
const moralsTextEl = document.querySelector('.morals-stat');
const stateTextEl = document.querySelector('.state-stat');

window.updatePlayerInfo = function(){
    hpTextEl.textContent = window.playerStats.hp;
    lvlTextEl.textContent = window.playerStats.lvl;
    moralsTextEl.textContent = window.playerStats.morals;
    stateTextEl.textContent = window.playerStats.state;
}