/**
 * 2C = Two of Clubs (Trébol)
 * 2S = Two of  Spades(Picas)
 * 2H = Two of Hearts (Corazon)
 * 2D = Two of Dimonds (Diamantes)
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['J', 'Q', 'K', 'A'];

let puntosJugador = 0;
let puntosOrdenador = 0;

// /referencias HTMl
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const divCartasJugador      = document.querySelector('#jugador-cartas')
const divCartasOrdenador    = document.querySelector('#ordenador-cartas')
// ordenador-cartas
const puntosHTML = document.querySelectorAll('small');


//Esta funcion crea una nueva baraja
const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }

    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo);
        }
    }

    // funcion de undersore para barajar o entregar el arreglo aleatorio
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}

crearDeck();

//esta funcion me permite tomar una carta
const pedirCarta = () => {
    if (deck.length === 0) {
        throw 'No hay más cartas en el Deck'
    }
    const carta = deck.pop();
    // console.log(deck);
    return carta;
}

pedirCarta();

//Funcion dar valor a la carta
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10
        : valor * 1;
}

// const valor = valorCarta(pedirCarta());
//Turno Ordenador

const turnoOrdenador = (puntosMinimos) => {
    do {
        const carta = pedirCarta();
        puntosOrdenador = puntosOrdenador + valorCarta(carta);
        puntosHTML[1].innerText = puntosOrdenador;
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasOrdenador.append(imgCarta);
        if( puntosMinimos > 21){
            break;
        }
    }while((puntosOrdenador < puntosMinimos) && (puntosMinimos <= 21));
    setTimeout(()=>{
        if ( puntosOrdenador === puntosMinimos){
            alert ('Nadie gana 😢')
        }else if (puntosMinimos > 21 ){
            alert('Ordenador Gana 💻 ')
        }else if (puntosOrdenador > 21){
            alert('Jugador Gana 🧑🏻')
        }else {
            alert('Ordenador Gana 💻 ')
        }

    },10);
};

//Eventos
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
        console.warn('Lo, siento perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoOrdenador(puntosJugador);
    } else if (puntosJugador === 21) {
        console.warn('21, Genial');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoOrdenador(puntosJugador);
    }

    

});

// btnDetener

btnDetener.addEventListener('click', () =>{
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoOrdenador(puntosJugador);
    
});

// btnNuevo
btnNuevo.addEventListener('click',()=>{
    console.clear();
    deck = [];
    deck = crearDeck();
    puntosJugador   = 0;
    puntosOrdenador = 0;
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasJugador.innerHTML      = '';
    divCartasOrdenador.innerHTML    = '';

    btnPedir.disabled   = false;
    btnDetener.disabled = false;
})