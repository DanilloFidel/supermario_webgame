//medir tela
var altura = 0;
var largura = 0;
var vidas = 1;
var koopa;
var tempo = 40;
var pontos = 0;
var koopaTime = 1500;
var inimigo = 1;

var dificuldade = window.location.search; //busca informação da dificuldade que veio por parametro
dificuldade = dificuldade.replace("?", ""); //remove um caracter por outro
if (dificuldade === "normal") {
  koopaTime = 1500;
} else if (dificuldade === "medio") {
  koopaTime = 1000;
} else if (dificuldade === "dificil") {
  koopaTime = 750;
}

function adjustWindow() {
  altura = window.innerHeight; // ajustando a tela
  largura = window.innerWidth;
}

adjustWindow();

var cronometro = setInterval(function() {
  tempo -= 1;
  if (tempo < 0) {
    clearInterval(cronometro); //limpar da memoria
    clearInterval(criarKoopa);
    window.location.href = "vitoria.html?" + pontos;
  } else {
    document.getElementById("tempo").innerHTML = tempo;
  }
}, 1000);

function createEnemy() {
  //remover koopa anterior caso exista
  if (document.getElementById("koopa")) {
    //verifica se o koopa existe antes de ser criado
    document.getElementById("koopa").remove();
    //verifica quantas vidas restam
    if (vidas > 3) {
      window.location.href = "fim_do_jogo.html?" + pontos;
    } else {
      document.getElementById("v" + vidas).src = "_imagens/coracao_vazio.png";
      vidas++;
    }
  }

  //gerar pos randomica
  var posX = Math.floor(Math.random() * largura) - 50; //retira uma parte do valor devido ao eixo da imagem
  var posY = Math.floor(Math.random() * altura) - 50;
  posX = posX < 0 ? 0 : posX; //controle caso as posições acontecam em 0
  posY = posY < 0 ? 0 : posY;

  //criar elemento no DOM
  koopa = document.createElement("img"); //cria o elemento
  inimigo = Math.ceil(Math.random() * 3);
  koopa.src = "_imagens/koopa" + inimigo + ".png"; //acessa o src
  koopa.className = tamanhoEnemy() + " " + sideEnemy(); //adiciona a classe chamando a função
  koopa.style.left = posX + "px";
  koopa.style.top = posY + "px";
  koopa.style.position = "absolute";
  koopa.id = "koopa";
  koopa.onclick = function() {
    pontos++;
    console.log(pontos);
    this.remove();
    document.getElementById("pontos").innerHTML = pontos;
  };
  document.body.appendChild(koopa);
}

function tamanhoEnemy() {
  //criar elemento que gera nome de classe
  var n = Math.ceil(Math.random() * 3);
  var tamanhoKoopa = "koopa" + n;
  return tamanhoKoopa;
}

function sideEnemy() {
  var classe = Math.floor(Math.random() * 2);
  switch (classe) {
    case 0:
      return "ladoA";
    case 1:
      return "ladoB";
  }
}
