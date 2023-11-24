const twoPlayersBtn = document.getElementById("two-players");
const againstComBtn = document.getElementById("against-com");
const twoPlayersPopup = document.querySelector(".two-players");
const againstComPopup = document.querySelector(".against-com");
const twoPlayersStartBtn = document.getElementById("two-players-start-btn");
const againstComStartBtn = document.getElementById("against-com-start-btn");
const modePopup = document.querySelector(".popup-mode");
const gameContainer = document.querySelector(".container");

let mode;
let currentPlayer = "player"; // Variable to keep track of the current player

twoPlayersBtn.addEventListener("click", () => {
  mode = "players";
  modePopup.classList.toggle("hide");
  twoPlayersPopup.classList.toggle("hide");
});

againstComBtn.addEventListener("click", () => {
  mode = "computer";
  modePopup.classList.toggle("hide");
  againstComPopup.classList.toggle("hide");
  currentPlayer = "player"; // Initialize currentPlayer to player
});

twoPlayersStartBtn.addEventListener("click", () => {
  const player1Input = document.getElementById("player1c");
  const player1Name = player1Input.value.trim();
  const player2Input = document.getElementById("player2");
  const player2Name = player2Input.value.trim();

  if (player1Name.length > 4 && player2Name.length > 4) {
    twoPlayersPopup.classList.toggle("hide");
    gameContainer.classList.remove("disable");
    currentPlayer = "player";
    enablePlayerTurn(); // Enable player's turn initially
  } else {
    alert(
      "Invalid input! Player name must not be empty and should contain at least 4 characters."
    );
  }
});

againstComStartBtn.addEventListener("click", () => {
  const player1Input = document.getElementById("player1");
  const player1Name = player1Input.value.trim();

  if (player1Name.length > 4) {
    againstComPopup.classList.toggle("hide");
    gameContainer.classList.remove("disable");
    currentPlayer = "player";
    enablePlayerTurn(); // Enable player's turn initially
    startComputerTurn(); // Start the computer's turn
  } else {
    alert(
      "Invalid input! Player name must not be empty and should contain at least 4 characters."
    );
  }
});

const cards = document.querySelectorAll(".card");
let computerTurnInterval;
let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;
let playerTurn = true;
function flipCard({ target: clickedCard }) {
  if (
    playerTurn &&
    cardOne !== clickedCard &&
    !disableDeck
  ) {
    clickedCard.classList.add("flip");
    if (!cardOne) {
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;
    disableDeck = true;
    let cardOneImg = cardOne.querySelector(".back-view img").src,
      cardTwoImg = cardTwo.querySelector(".back-view img").src;
    matchCards(cardOneImg, cardTwoImg);
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    matched++;
    if (matched == 12) {
      setTimeout(() => {
        return shuffleCard();
      }, 1000);
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    return disableDeck = false;
  }
  setTimeout(() => {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);

  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = "";
    disableDeck = false;
  }, 1200);
}

function shuffleCard() {
  matched = 0;
  disableDeck = false;
  cardOne = cardTwo = "";
  let arr = [];
  for (let i = 1; i <= cards.length / 2; i++) {
    arr.push(i, i);
  }
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
  cards.forEach((card, i) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector(".back-view img");
    imgTag.src = `images/img-${arr[i]}.png`;
    card.addEventListener("click", flipCard);
  });
}

let isComputerTurnIntervalSet = false;

function startComputerTurn() {
  currentPlayer = "computer";
  disablePlayerTurn(); // Disable player's turn during computer's turn

  setTimeout(() => {
    computerTurn();
    enablePlayerTurn(); // Allow player to make moves after computer's turn
  }, 0);

  if (!isComputerTurnIntervalSet) {
    computerTurnInterval = setInterval(() => {
      computerTurn();
    }, 2000);
    isComputerTurnIntervalSet = true;
  }
}

function stopComputerTurn() {
  clearInterval(computerTurnInterval);
  currentPlayer = "player";
  // After the computer's turn, allow the player to play
  enablePlayerTurn();
}

function enablePlayerTurn() {
  playerTurn = true;
  currentPlayer = "player";
  cards.forEach((card) => {
    card.addEventListener("click", flipCard);
  });
}

function disablePlayerTurn() {
  playerTurn = false;
  currentPlayer = "computer";
  cards.forEach((card) => {
    card.removeEventListener("click", flipCard);
  });
  startComputerTurn();
}
function computerTurn() {
  console.log("computer")
  playerTurn = false; // Prevent player from making moves during computer's turn

  let unflippedCards = Array.from(cards).filter(
    (card) => !card.classList.contains("flip")
  );

  if (unflippedCards.length > 1 && !playerTurn) {
    const randomIndices = getRandomIndices(unflippedCards.length);
    const computerCardOne = unflippedCards[randomIndices[0]];
    const computerCardTwo = unflippedCards[randomIndices[1]];

    computerCardOne.classList.add("flip");
    computerCardTwo.classList.add("flip");

    let computerCardOneImg =
      computerCardOne.querySelector(".back-view img").src;
    let computerCardTwoImg =
      computerCardTwo.querySelector(".back-view img").src;

    setTimeout(() => {
      matchCards(computerCardOneImg, computerCardTwoImg);

      if (computerCardOneImg !== computerCardTwoImg) {
        computerCardOne.classList.add("shake");
        computerCardTwo.classList.add("shake");

        setTimeout(() => {
          computerCardOne.classList.remove("flip", "shake");
          computerCardTwo.classList.remove("flip", "shake");
          enablePlayerTurn(); // Allow player to make moves after computer's turn
        }, 1200);
      } else {
        enablePlayerTurn(); // Allow player to make moves after computer's turn
      }
    }, 1000);
  }
}


function getRandomIndices(length) {
  const indices = Array.from({ length }, (_, index) => index);
  indices.sort(() => Math.random() - 0.5);
  return indices;
}

shuffleCard();
cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
