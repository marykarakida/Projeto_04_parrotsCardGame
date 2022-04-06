let cartasClicadas = 0;

pedirCartasNumero();

function pedirCartasNumero() {
    let numero = Number(prompt("Olá, jogador(a)! Com quantas cartas você gostaria de jogar? Digite um número par, de 4 a 14"));
    let numeroValido = false;
    while (numeroValido === false) {
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
        document.querySelector("ul").innerHTML += `<li class="carta" onclick="clicarCarta(this)"><div class="face face--frente"><img src="asset/img/front.png" /></div><div class="face face--verso"><img src="asset/gif/${cartas[i]}.gif" /></div></li>`;
    }
}

function comparador() {
    return Math.random() - 0.5;
}

function clicarCarta(carta) {
    carta.classList.toggle('is-flipped');
}