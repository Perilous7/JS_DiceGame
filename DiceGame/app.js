/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
/*eslint-env browser*/
var scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if(gamePlaying){
        //1 random number
        var dice = Math.ceil(Math.random() * 6);
        //2 display result
        var diceDOM = document.querySelector('.dice')
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-'+ dice+'.png';
    
        if(dice!=1){
            roundScore += dice;
            document.querySelector('#current-'+activePlayer).textContent = roundScore;
        }else{
        nextPlayer();

        }
    }
    
});

document.querySelector('.btn-hold').addEventListener('click',function(){
    // Add current to global score
    if(gamePlaying)
    {
       scores[activePlayer] += roundScore;
    
    // Update UI
    document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
    roundScore = 0
    document.querySelector('#current-'+activePlayer).textContent = roundScore;
    
    //check wining condition
    if(scores[activePlayer]>=25){
        document.getElementById('name-'+activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
        gamePlaying = false;

    }else{
        nextPlayer();
        }
    }
});
    
    

function nextPlayer(){
    // reset current score for player
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    //switch player
    var inactivePlayer = activePlayer;
    activePlayer = 1-activePlayer;
    document.querySelector('.player-'+inactivePlayer+'-panel').classList.toggle('active');
    document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
    
    document.querySelector('.dice').style.display = 'none';

}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    gamePlaying = true;
    scores= [0, 0];
    activePlayer = 0;
    roundScore = 0;
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'player1';
    document.getElementById('name-1').textContent = 'player2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winener');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    

    document.querySelector('.dice').style.display = 'none';
    
    
}

