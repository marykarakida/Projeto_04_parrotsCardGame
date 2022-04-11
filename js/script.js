let numero = 0;
let parCartas = [];
let cartasViradas = 0;
let jogadas = 0;
let comeco, duracao, cronometro;
let delay=false;

pedirCartasNumero();

function pedirCartasNumero() {
    numero = Number(prompt("Olá, jogador(a)! Com quantas cartas você gostaria de jogar? \nDigite um número par, de 4 a 14."));
    let numeroValido = false;
    while (!numeroValido) {
        if (isNaN(numero) === false && numero <= 14 && numero >= 4 && numero % 2 === 0) {
            numeroValido = true;
        } else {
            numero = Number(prompt("Por favor, digite um número par, de 4 a 14, para começar o jogo"));
        }
    }
    randomizarCartas(numero);
}

function randomizarCartas(numero) {
    let cartas = ["bobrossparrot","explodyparrot","fiestaparrot","metalparrot","revertitparrot","tripletsparrot","unicornparrot"];
    cartas.sort(comparador);
    cartas = cartas.slice(0, numero/2);
    for (var i = 0; i < numero/2; i++) {
        cartas.push(cartas[i]);
    }
    cartas.sort(comparador);
    inserirCartas(cartas);
}

function inserirCartas(cartas) {
    for (var i = 0; i < cartas.length; i++) {
        setTimeout(function(carta) {
            document.querySelector("ul").innerHTML += `<li><div class="carta" onclick="clicarCarta(this)"><div class="face frente"><img src="asset/img/front.png" /></div><div class="face verso"><img src="asset/gif/${carta}.gif" /></div></div></li>`;
        }, i*200, cartas[i])
    }
    document.querySelector(".informacao").innerHTML = `<div class="tempo"><ion-icon name="timer-outline"></ion-icon><span>0s</span></div>-`;
    let intervalo = () => {cronometro = setInterval(medirTempo,1000,Date.now())};
    setTimeout(intervalo,i*200);
}

function comparador() {
    return Math.random() - 0.5;
}

function medirTempo(comeco) {
    duracao = parseInt((Date.now() - comeco) / 1000);
    document.querySelector(".informacao").innerHTML = `<div class="tempo"><ion-icon name="timer-outline"></ion-icon><span>${duracao}s</span></div>`;
}

function mostrarRegras(icone) {
    icone.classList.toggle("selecionado");
}

function clicarCarta(carta) {
    if (document.querySelectorAll("li").length !== numero) {
        return;
    }
    if (!carta.classList.contains("virada") && delay===false) {
        carta.classList.add("virada");
        parCartas.push(carta);
        jogadas++;
    }
    if (parCartas.length === 2) {
        conferirPar(parCartas);
        parCartas = [];
    }
}

function conferirPar(parCartas) {
    if (parCartas[0].innerHTML !== parCartas[1].innerHTML) {
        delay = true;
        setTimeout(desvirarCarta, 1000, parCartas);
    } 
    cartasViradas = document.querySelectorAll(".virada").length;
    if (cartasViradas === numero) {
        finalizarJogo();
    }
}

function desvirarCarta(parCartas) {
    for (var i = 0; i < parCartas.length; i++) {
        parCartas[i].classList.remove("virada");
    }
    delay = false;
}

function finalizarJogo() {
    clearInterval(cronometro);
    alert(`Você ganhou em ${jogadas} jogadas e ${parseInt(duracao)} segundos!`);
    let novoJogo = prompt('Você quer jogar novamente? \nSe sim, digite "sim"; caso contrário, digite "não"' );
    let respostaValida = false;
    while (respostaValida === false) {
        if (novoJogo === "sim") {
            respostaValida = true;
            resetarJogo();
        } else if (novoJogo === "não"){
            respostaValida = true;
            alert("Obrigada por jogar!");
        } else {
            novoJogo = prompt('Respota inválida. Você quer jogar novamente? Se sim, digite "sim"; caso contrário, digite "não"' );
        }

    }
}

function resetarJogo() {
    document.querySelector("ul").innerHTML = "";
    document.querySelector(".tempo").innerHTML = "";
    numero = 0;
    parCartas = [];
    cartasViradas = 0;
    jogadas = 0;
    pedirCartasNumero();
}