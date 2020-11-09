const table = document.querySelector('#cardsTable');
const deckOfCardsAPI = 'https://deckofcardsapi.com/api/deck/new/';

const getDeck = document.querySelector('#deck');
getDeck.addEventListener('click', prepareDeck);

const giveCards = document.querySelector('#shuffle');
giveCards.addEventListener('click', getCards);

var xhr;
var deckID;
var responseCard;

document.querySelector('#reload').addEventListener('click', reload);

function reload(){
    window.location.reload();
}

function getCards() {

    drawACardFromDeck().then(card => {
        localStorage.setItem('card1', JSON.stringify(card));
        let card1img = JSON.parse(localStorage.getItem('card1'));
        document.querySelector('#cardLeft').innerHTML = `<img src="${card1img.cards[0].image}"></img>`;
    });


    drawACardFromDeck().then(card => {
        localStorage.setItem('card2', JSON.stringify(card));
        let card1img = JSON.parse(localStorage.getItem('card2'));
        document.querySelector('#cardRight').innerHTML = `<img src="${card1img.cards[0].image}"></img>`;
    });


}

async function drawACardFromDeck(showCardInDom){
    let deckId = localStorage.getItem('deckID');
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    responseCard = await response.json();
    console.log(responseCard);
    return responseCard;
}

function prepareDeck(){
    //clear local storage
    clearLocalStorage();
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

