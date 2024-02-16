const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
        gameVelocity: 2000,
        hitPosition: 0,
        result: 0,
        currentTime: 30,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000), // Updates every second (1000 ms)
    }
};

//Funcao para decrementar o tempo do jogo
function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! Your Score is " + state.values.result); 
        playSound("gameover");
    }
}

//Funcao para adicionar sons genericos dentro do codigo
function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.wav`);
    audio.volume = 0.2;
    audio.play();
}

//Funçao para colocar o inimigo em um quadrado aleatório
function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy"); //limpa  a classe "enemy" de todos os quadrados
    });

    let randomNumber = Math.floor(Math.random() * 9); //sorteio aleatório de um numero de 1 a 9
    let randomSquare = state.view.squares[randomNumber]; //pega o quadrado do numero sorteado
    randomSquare.classList.add("enemy"); //adiciona o inimigo no quadrado sorteado
    state.values.hitPosition = randomSquare.id; //guarda a posição do quadrado que recebeu o inimigo
}

//
function addListenerHitbox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", ()=> {
            if(square.id === state.values.hitPosition){ //se o quadrado que o jogador clicou é o mesmo que foi sorteado
                state.values.result++; //aumenta a contagem de acertos
                state.view.score.textContent = state.values.result;  //atualiza o placar com o novo valor
                state.values.hitPosition = null; //reseta a variável da posição do quadrado com o inimigo
                playSound("hit");
            }
        })
    });
}

function initialize() {
    addListenerHitbox();
}

initialize();