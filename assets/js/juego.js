/**
 * 2C = Two of Clubs (Trébol)
 * 2S = Two of  Spades(Picas)
 * 2H = Two of Hearts (Corazon)
 * 2D = Two of Dimonds (Diamantes)
 */

let deck            = [];
const tipos         = ['C','D','H','S'];
const especiales    = ['J','Q','K','A'];

let puntosJugador = 0;
let puntosOrdenador = 0;

// /referencias HTMl
const btnPedir = document.querySelector('#btnPedir');

const divCartasJugador = document.querySelector('#jugador-cartas')
const puntosHTML = document.querySelectorAll('small');


//Esta funcion crea una nueva baraja
const crearDeck = ()=>{
    for(let i = 2 ; i <= 10; i++){
        for( let tipo of tipos){
            deck.push(i+tipo);
        }
    }

    for(let tipo of tipos){
        for (let esp of especiales){
            deck.push( esp + tipo);
        }
    }

    // funcion de undersore para barajar o entregar el arreglo aleatorio
    deck= _.shuffle(deck);
    // console.log(deck);
    return deck;
}

crearDeck();

//esta funcion me permite tomar una carta
const pedirCarta = ()=>{
    if(deck.length === 0){
        throw 'No hay más cartas en el Deck'
    }
    const carta = deck.pop();
    // console.log(deck);
    return carta;
}

pedirCarta();

//Funcion dar valor a la carta
const valorCarta = (carta)=>{
    const valor = carta.substring(0,carta.length -1);
    return (isNaN(valor)) ?
            (valor === 'A') ? 11: 10
            : valor * 1;
}

// const valor = valorCarta(pedirCarta());
//Turno Ordenador



//Eventos
btnPedir.addEventListener('click',() => {
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta( carta );
    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append( imgCarta);

    if (puntosJugador > 21){
        console.warn('Lo, siento perdiste');
        btnPedir.disabled = true;
    } else if (puntosJugador === 21){
        console.warn('21, Genial');
        btnPedir.disabled = true;
    }

})


