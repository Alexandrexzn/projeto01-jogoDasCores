let colors = ['red', 'blue', 'green', 'yellow'];
let allColors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown' , 'black' , 'white' , 'beige' , 'gray' , 'cyan' , 'magenta' , 'maroon' , 'salmon' , 'Lilac' , 'Mustard' , 'Aquamarine' , 'Coral' , 'Peach'];
const colorName = document.getElementById('colorName');
const buttonsDiv = document.getElementById('buttons');
const scoreDisplay = document.getElementById('score');
let score = 0;
let difficulty = 1;
let timer = 7; // ou o tempo que você quiser
let timerInterval; // só será usado quando clicar no botão

// Função para embaralhar as cores
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Pegando elementos de tela
const telaInicial = document.getElementById('tela-inicial');
const areaJogo = document.getElementById('area-jogo');
const botaoComecar = document.getElementById('botao-comecar');

botaoComecar.addEventListener('click', () => {
  telaInicial.style.display = 'none';
  areaJogo.style.display = 'block';
  iniciarJogo(); // Começa o jogo oficialmente
});


// Função que reinicia o jogo
function reiniciarJogo() {
  alert('Tempo acabou! Reiniciando o jogo...');
  score = 0;
  scoreDisplay.textContent = score;
  colors = ['red', 'blue', 'green', 'yellow']; // Resetando as cores
  difficulty = 1; // Resetando a dificuldade
  iniciarTimer(); // Reinicia o temporizador
  newRound(); // Inicia uma nova rodada
}

// Função que começa o temporizador
function iniciarTimer() {
  clearInterval(timerInterval); // Limpar o intervalo anterior (caso exista)

  timer = 6; // Resetando o temporizador para 10 segundos
  document.getElementById('timer').textContent = timer; // Atualiza o tempo na tela

  // Iniciando a contagem regressiva
  timerInterval = setInterval(() => {
    timer--; // Decrease the time by 1 second
    document.getElementById('timer').textContent = timer; // Atualiza o tempo na tela

    if (timer <= 0) { // Quando o tempo chega a zero, reinicia o jogo
      clearInterval(timerInterval);
      reiniciarJogo();
    }
  }, 1000); // De 1 em 1 segundo
}

// Função que cria uma nova rodada
function newRound() {
  // Verifica a dificuldade
  if (score > 0 && score % 10 === 0 && difficulty < 3) {
    difficulty++;
    alert('Dificuldade aumentada!');
    colors = allColors.slice(0, 4 + difficulty * 2); // Aumenta o número de cores
  }

  const shuffled = [...colors];
  shuffle(shuffled);  // Embaralha as cores para tornar aleatório
  buttonsDiv.innerHTML = ''; // Limpa os botões anteriores

  // Cria os botões com as cores
  shuffled.forEach(color => {
    const button = document.createElement('div');
    button.className = 'colorButton';
    button.style.backgroundColor = color;
    button.addEventListener('click', () => checkColor(color));
    buttonsDiv.appendChild(button);
  });

  // Cor correta e cor de engano para o nome
  const correctColor = colors[Math.floor(Math.random() * colors.length)];
  let fakeColor;
  do {
    fakeColor = colors[Math.floor(Math.random() * colors.length)];
  } while (fakeColor === correctColor);

  colorName.textContent = correctColor;
  colorName.style.color = fakeColor; // Engana visualmente
}

// Função que verifica a cor selecionada pelo jogador
function checkColor(selected) {
  if (selected === colorName.textContent) {
    score++;
    scoreDisplay.textContent = score;
    resetTimer(); // Reinicia o temporizador a cada acerto
  } else {
    alert('Game Over! Pontuação: ' + score);
    score = 0;
    scoreDisplay.textContent = score;
    colors = allColors.slice(0, 4); // Volta para o nível fácil
    difficulty = 1;
  }
  newRound(); // Inicia uma nova rodada
}

// Função para reiniciar o temporizador
function resetTimer() {
  clearInterval(timerInterval); // Limpar o intervalo anterior
  timer = 10; // Resetando o temporizador para 10 segundos
  document.getElementById('timer').textContent = timer; // Atualiza o tempo na tela
  iniciarTimer(); // Reinicia a contagem regressiva
}

// Chama a função para iniciar o jogo
newRound();

let tempo = 5;
let intervalo;

function iniciarJogo() {
  intervalo = setInterval(() => {
    tempo--;
    document.getElementById("contador").innerText = "Tempo: " + tempo;

    if (tempo === 0) {
      clearInterval(intervalo);
      alert("Tempo acabou! Reiniciando o jogo...");
      location.reload(); // reinicia a página
    }
  }, 1000);
}

// só inicia ao clicar no botão
document.getElementById("botao-comecar").addEventListener("click", () => {
  iniciarJogo();
});

function iniciarJogo() {
    score = 0;
    scoreDisplay.textContent = score;
    difficulty = 1;
    newRound();       // Gera as cores e botões
    iniciarTimer();   // Começa o timer SOMENTE AQUI
  }
  
  botaoComecar.addEventListener('click', () => {
    telaInicial.style.display = 'none';
    areaJogo.style.display = 'block';
    iniciarJogo(); // Começa o jogo e o timer aqui!
  });


  let nivel = 1;
let container = document.getElementById("container"); 

function gerarCorAleatoria() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function criarLinhaNova() {
  const novaLinha = document.createElement("div");
  novaLinha.classList.add("linha");

  for (let i = 0; i < 4; i++) { // 4 blocos por linha, por exemplo
    const bloco = document.createElement("div");
    bloco.classList.add("bloco");
    bloco.style.backgroundColor = gerarCorAleatoria();
    novaLinha.appendChild(bloco);
  }

  container.appendChild(novaLinha);
}

function aumentarDificuldade() {
  nivel++;
  criarLinhaNova(); // Sempre adiciona uma nova linha com cores novas
  console.log("Nível atual:", nivel);
}

if (pontos >= pontosParaSubir) {
    aumentarDificuldade();
    pontos = 0;
  }


  function endGame() {
    clearInterval(timerInterval);
    isGameRunning = false;
    gameOverScreen.classList.remove('hidden');
    finalScoreDisplay.textContent = `Pontuação Final: ${score}`;
}

function restartGame() {
    score = 0;
    scoreDisplay.textContent = `Pontuação: ${score}`;
    gameOverScreen.classList.add('hidden');
    isGameRunning = true;
    setupLevel();
}

function returnToStart() {
    clearInterval(timerInterval);
    isGameRunning = false;
    startScreen.classList.remove('hidden');
    gameOverScreen.classList.add('hidden');
    settingsMenu.style.display = 'none';
    currentLevel = 1;
    score = 0;
    scoreDisplay.textContent = `Pontuação: ${score}`;
}

function increaseDifficulty() {
    currentLevel = currentLevel < 7 ? currentLevel + 1 : 1;
    messageDisplay.textContent = `Dificuldade aumentada para nível ${currentLevel}!`;
    setTimeout(() => messageDisplay.textContent = '', 2000);
    if (isGameRunning) {
        setupLevel();
    }
    settingsMenu.style.display = 'none';
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

settingsIcon.addEventListener('click', () => {
    settingsMenu.style.display = settingsMenu.style.display === 'block' ? 'none' : 'block';
});

window.addEventListener('click', (e) => {
    if (!settingsIcon.contains(e.target) && !settingsMenu.contains(e.target)) {
        settingsMenu.style.display = 'none';
    }
});

let contadorAcertos = 0;

// Função para verificar a cor correta
function verificarCor(corSelecionada) {
  if (corSelecionada === 'azul') {
    if (contadorAcertos === 0) {
      document.getElementById('audioYes').play();
    } else if (contadorAcertos === 1) {
      document.getElementById('audioGood').play();
    } else {
      document.getElementById('audioGreat').play();
    }
    contadorAcertos++;
  } else {
    alert('Tente novamente!');
  }
}

// Função para mostrar o menu de músicas
function mostrarMenuMusicas() {
  let menu = document.getElementById('menuMusicas');
  menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}

// Função para tocar uma música
function tocarMusica(musica) {
  // Parar qualquer música que esteja tocando
  stopAllMusics();

  // Tocar a música escolhida
  let audio = document.getElementById(musica);
  audio.play();
}

// Função para parar todas as músicas
function stopAllMusics() {
  let audios = document.querySelectorAll('audio');
  audios.forEach(audio => audio.pause());
  audios.forEach(audio => audio.currentTime = 0); // Resetar para o início
}

function mostrarMenuMusicas() {
    let menu = document.getElementById('menuMusicas');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
  }
