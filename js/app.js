const table = document.querySelector('#cardsTable');
const deckOfCardsAPI = 'https://deckofcardsapi.com/api/deck/new/';
const giveCards = document.querySelector('#shuffle');
giveCards.addEventListener('click', giveHand);
//const shuffleDeckAPI = `https://deckofcardsapi.com/api/deck/${deckID}/shuffle/`;
var xhr;
var deckID;
var responseCard;
var imgString;

//clear local storage
clearLocalStorage();
prepareDeck();


async function giveHand() {

    const card1 = drawACardFromDeck();
    const card2 = drawACardFromDeck();

    const playersCard1 = document.querySelector('#cardLeft');
    const playersCard2 = document.querySelector('#cardRight');

    console.log(card1);
    console.log(card2);
    playersCard1.innerHTML = `<img src="${card1.cards.image}" alt="}">`;
    playersCard2.innerHTML = `<img src="${card2.cards.image}" alt="}">`;
}


async function drawACardFromDeck(prepare){
    let deckId = localStorage.getItem('deckID');
    console.log(deckId);
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    responseCard = await response.json();
    console.log(responseCard);
    return responseCard;
}

function prepareDeck(){
    // get a deck
    getCardsDeckWithAPI(shuffleDeck);

}

function getCardsDeckWithAPI(shuffleDeck) {
    xhr = new XMLHttpRequest();
    xhr.open('GET', deckOfCardsAPI, true);
    xhr.onload = function () {
          if(this.status === 200 && this.readyState === 4){
              const responseCards = JSON.parse(this.responseText);
              deckID = responseCards.deck_id;
              console.log("this is the first deckid " + deckID);
              localStorage.setItem('deckID', deckID);
              shuffleDeck();

          }else{
              console.log("There was an error getting the cards deck: " + this.errorText);

          }
    }
    xhr.send();
}

function shuffleDeck(){
    //deckID = localStorage.getItem('deckID');
    xhr.open('GET', `https://deckofcardsapi.com/api/deck/${deckID}/shuffle/`, true);
    xhr.onload = function () {
        if(this.status === 200 && this.readyState === 4){

            console.log("deck has been saved to local storage with id " + deckID);
        }else{
            console.log("There was an error shuffling the cards deck " + this.errorText);
        }
    }
    xhr.send();
}


function clearLocalStorage() {
    localStorage.clear();
}




/*function drawACardFromDeck() {
    //load deck id from local storage
    deckID = localStorage.getItem("deckID");
    var responseCard = null;
    xhr = new XMLHttpRequest();
    xhr.open('GET', `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`,true);
    xhr.onload = function (){
        if(this.status === 200 && this.readyState === 4){
            responseCard = JSON.parse(this.responseText);
            playerHand.push(responseCard.value);

            console.log(responseCard.value.cards.image);
            return responseCard;
        }

    }
    xhr.send();
    return responseCard;
}*/