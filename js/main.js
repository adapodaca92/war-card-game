let deckId = '';
let player1Cards = 0;
let player2Cards = 0;
let cardsInDeck = 0;

document.querySelector('button').addEventListener('click', dealTwoCards);
document.querySelector('#war').addEventListener('click', war);

fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  .then((res) => res.json()) // parse response as JSON
  .then((data) => {
    console.log(data);
    deckId = data.deck_id;
    cardsInDeck = data.remaining;
    console.log(cardsInDeck);
  })
  .catch((err) => {
    console.log(`error ${err}`);
  });

function dealTwoCards() {
  const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      cardsInDeck = data.remaining;
      console.log(cardsInDeck);
      let numOfCardsLeft = data.remaining;
      localStorage.setItem('cardsRemaining', numOfCardsLeft);
      document.querySelector('#player1').src = data.cards[0].image;
      document.querySelector('#player2').src = data.cards[1].image;
      let player1Val = convertToNum(data.cards[0].value);
      let player2Val = convertToNum(data.cards[1].value);
      if (player1Val > player2Val) {
        document.querySelector('h3').innerText = 'Player 1 wins the round!';
        player1Cards += 2;
        document.querySelector(
          '.cardCount1'
        ).innerText = `Player 1 Card Count: ${player1Cards}`;
        console.log(`Player 1 Cards: ${player1Cards}`);
        console.log(`Player 2 Cards: ${player2Cards}`);
        checkDeckCount(cardsInDeck);
      } else if (player1Val < player2Val) {
        document.querySelector('h3').innerText = 'Player 2 wins the round!';
        player2Cards += 2;
        document.querySelector(
          '.cardCount2'
        ).innerText = `Player 2 Card Count: ${player2Cards}`;
        console.log(`Player 1 Cards: ${player1Cards}`);
        console.log(`Player 2 Cards: ${player2Cards}`);
        checkDeckCount(cardsInDeck);
      } else {
        document.querySelector('h3').innerText = 'WAR!';
        cardsInDeck -= 2;
        console.log(`Player 1 Cards: ${player1Cards}`);
        console.log(`Player 2 Cards: ${player2Cards}`);
      }
    })
    .catch((err) => console.log(`Error: ${err}.`));
}

function convertToNum(value) {
  if (value === 'ACE') {
    return 14;
  } else if (value === 'KING') {
    return 13;
  } else if (value === 'QUEEN') {
    return 12;
  } else if (value === 'JACK') {
    return 11;
  } else {
    return Number(value);
  }
}

function war() {
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=8`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      cardsInDeck = data.remaining;
      console.log(cardsInDeck);
      let numOfCardsLeft = localStorage.getItem('cardsRemaining');
      localStorage.setItem('cardsRemaining', numOfCardsLeft - 8);
      document.querySelector('#player1').src = data.cards[6].image;
      document.querySelector('#player2').src = data.cards[7].image;
      let player1Val = convertToNum(data.cards[6].value);
      let player2Val = convertToNum(data.cards[7].value);
      if (player1Val > player2Val) {
        document.querySelector('h3').innerText = 'Player 1 Wins!';
        player1Cards += 10;
        document.querySelector(
          '.cardCount1'
        ).innerText = `Player 1 Card Count: ${player1Cards}`;
        console.log(`Player 1 Cards: ${player1Cards}`);
        console.log(`Player 2 Cards: ${player2Cards}`);
        checkDeckCount(cardsInDeck);
      } else if (player1Val < player2Val) {
        document.querySelector('h3').innerText = 'Player 2 Wins!';
        player2Cards += 10;
        document.querySelector(
          '.cardCount2'
        ).innerText = `Player 2 Card Count: ${player2Cards}`;
        console.log(`Player 1 Cards: ${player1Cards}`);
        console.log(`Player 2 Cards: ${player2Cards}`);
        checkDeckCount(cardsInDeck);
      }
    })
    .catch((err) => console.log(`Error: ${err}.`));
  // if (cardsInDeck === 0) {
  //   player1Cards > player2Cards
  //     ? (document.querySelector('h3').innerText =
  //         'No cards left, Player 1 wins the game!')
  //     : (document.querySelector('h3').innerText =
  //         'No cards left, Player 2 wins the game!');
  // }
}

function checkDeckCount(deckCount) {
  if (deckCount === 0) {
    player1Cards > player2Cards
      ? (document.querySelector('h3').innerText =
          'No cards left, Player 1 wins the game!')
      : (document.querySelector('h3').innerText =
          'No cards left, Player 2 wins the game!');
  }
}
