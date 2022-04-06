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
    // const cartas = ["bobrossparrot","explodyparrot","fiestaparrot","metalparrot","revertitparrot","tripletsparrot","unicornparrot"];
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
        document.querySelector("ul").innerHTML += `<li class="carta"><img class="frente" src="asset/img/front.png" /><img class="verso escondido" src="asset/gif/${cartas[i]}.gif" /></li>`;
    }
}

function comparador() {
    return Math.random() - 0.5;
}

//da paracriar uma lista que contem o nome dos arquivos gif, e add os itens da lista no ul