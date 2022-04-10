let numero = 0;
let parCartas = [];
let cartasViradas = 0;
let jogadas = 0;
let comeco, duracao, intervalo;
let delay = false;

pedirCartasNumero();

function pedirCartasNumero() {
    numero = Number(prompt("Olá, jogador(a)! Com quantas cartas você gostaria de jogar? Digite um número par, de 4 a 14"));
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
        document.querySelector("ul").innerHTML += `<li><div class="carta" onclick="clicarCarta(this)"><div class="face frente"><img src="asset/img/front.png" /></div><div class="face verso"><img src="asset/gif/${cartas[i]}.gif" /></div></div></li>`;
    }
    comeco = Date.now();
    intervalo = setInterval(medirTempo,1000,comeco);
}

function comparador() {
    return Math.random() - 0.5;
}

function medirTempo() {
    duracao = parseInt((Date.now() - comeco) / 1000);
    document.querySelector(".tempo").innerHTML = `Timer: ${duracao}s`;
}

function clicarCarta(carta) {
    if (!carta.classList.contains("virada") && !delay) {
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
    alert(`Você ganhou em ${jogadas} jogadas e ${parseInt(duracao)} segundos!`);
    let novoJogo = prompt('Você quer jogar novamente? Se sim, digite "sim"; caso contrário, digite "não"' );
    let respostaValida = false;
    while (respostaValida === false) {
        if (novoJogo === "sim") {
            respostaValida = true;
            resetarJogo();
        } else if (novoJogo === "não"){
            respostaValida = true;
            alert("Obrigada por jogar!");
            clearInterval(intervalo);
        } else {
            novoJogo = prompt('Respota inválida. Você quer jogar novamente? Se sim, digite "sim"; caso contrário, digite "não"' );
        }

    }
}

function resetarJogo() {
    document.querySelector("ul").innerHTML = "";
    numero = 0;
    parCartas = [];
    cartasViradas = 0;
    jogadas = 0;
    pedirCartasNumero();
}