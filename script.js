const twoPlayersBtn = document.getElementById("two-players");
const againstComBtn = document.getElementById("against-com");
const twoPlayersPopup = document.querySelector(".two-players");
const twoPlayersStartBtn = document.getElementById("two-players-start-btn");
const againstComStartBtn = document.getElementById("against-com-start-btn");
const modePopup = document.querySelector(".popup-mode");
const againstComPopup = document.querySelector(".against-com");
const gameContainer = document.querySelector(".container");
const turnTitle = document.querySelector(".turn");
const player1Input = document.getElementById("player1c");
const playerInput = document.getElementById("player1d")
const player2Input = document.getElementById("player2");
const resetGameBtn = document.querySelectorAll(".reset-game");
const restartGameBtn = document.querySelectorAll(".restart-game");
const player1ScoreDisplay = document.querySelector(
  ".players-points p:nth-child(1) #score"
);
const player2ScoreDisplay = document.querySelector(
  ".players-points p:nth-child(2) #score"
);
const winnerPopup = document.querySelector(".winner-popup");
const historyContainer = document.querySelector(".history-list");

let currentPlayer;
let player1;
let player2;
let player1Score = 0;
let player2Score = 0;
let winnerscore1= 0;
let winnerscore2= 0;
let winner;
let mode;

twoPlayersBtn.addEventListener("click", () => {
  mode = "players";
  modePopup.classList.toggle("hide");
  twoPlayersPopup.classList.toggle("hide");
});

againstComBtn.addEventListener("click", () => {
    mode = "computer"
    modePopup.classList.toggle("hide");
    againstComPopup.classList.toggle("hide");
});

twoPlayersStartBtn.addEventListener("click", () => {

    currentPlayer = player1Input.value.toUpperCase();
    
    turnTitle.textContent = `${currentPlayer}s tur`
    player1 =  player1Input.value.toUpperCase();
    player2 =  player2Input.value.toUpperCase();

    const player1Name = player1Input.value.trim();
    const player2Name = player2Input.value.trim();

    document.getElementById("player1-name").textContent = player1;
    currentPlayer = player1Input.value.toUpperCase();
    document.getElementById("player2-name").textContent = player2;
    if (player1Name.length >= 3 && player2Name.length >= 3) {
        twoPlayersPopup.classList.toggle("hide");
        gameContainer.classList.remove("disable")
    } else {
      alert("Invalid input! Player name must not be empty and should contain at least 3 characters.");
    }
});
  
againstComStartBtn.addEventListener("click", () => {
    currentPlayer = playerInput.value.toUpperCase();
    
    turnTitle.textContent = `${currentPlayer}s tur`
    player1 =  playerInput.value.toUpperCase();
    player2 =  "Dator";
    const playerName = playerInput.value.trim();
    document.getElementById("player1-name").textContent = player1;
    document.getElementById("player2-name").textContent = player2;
    if (playerName.length >= 3) {
        againstComPopup.classList.toggle("hide")
        gameContainer.classList.remove("disable")
    } else {
      alert("Invalid input! Player name must not be empty and should contain at least 3 characters.");
    }
});

resetGameBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    resetGame();
    winnerPopup.classList.add("hide");
    gameContainer.classList.remove("disable");
    printTopSpelare();
  })});

restartGameBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    location.reload();
  });
});

const cards = document.querySelectorAll(".card");
let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;

// viktigt ----------------------------------------------------------------
function flipCard({ target: clickedCard }) {
  if (cardOne !== clickedCard && !disableDeck) {
    clickedCard.classList.add("flip");
    if (!cardOne) {
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;
    disableDeck = true;
    let cardOneImg = cardOne
        .querySelector(".back-view img")
        .getAttribute("src"),
      cardTwoImg = cardTwo.querySelector(".back-view img").getAttribute("src");
    matchCards(cardOneImg, cardTwoImg);
  }
}
function flipComputerCard(clickedCard1,clickedCard2) {
    if(cardOne !== clickedCard1 && !disableDeck) {
        clickedCard1.classList.add("flip");
        if(!cardOne) {
            cardOne = clickedCard1;
        }
        clickedCard2.classList.add("flip");
        cardTwo = clickedCard2;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").getAttribute("src"),
        cardTwoImg = cardTwo.querySelector(".back-view img").getAttribute("src");
        matchCards(cardOneImg, cardTwoImg);
    }
    
}
  
  function flipComputerCardHelper() {
    // Helper function to continue the computer's turn
    // Get all cards that are not flipped
    const unflippedCards = Array.from(document.querySelectorAll('.card:not(.flip)'));
  
    // Choose two random indices
    const index1 = Math.floor(Math.random() * unflippedCards.length);
    let index2;
  
    do {
      index2 = Math.floor(Math.random() * unflippedCards.length);
    } while (index2 === index1); // Ensure index2 is different from index1
  
    // Choose the first two cards
    const chosenCard1 = unflippedCards[index1];
    const chosenCard2 = unflippedCards[index2];
    // Simulate a click event on the chosen cards
    flipComputerCard(chosenCard1,chosenCard2);
  }

  //  hämta sprelaren med högst antal vinster från local storage--------------
function printTopSpelare() {
  let topSpelare = document.getElementById("topPlayer");
  topSpelare.innerText = `${localStorage.getItem("topPlayerName") || ""} har (${
    localStorage.getItem("topPlayerCount") || 0
  }) Vinster`;
}
printTopSpelare();

 // localStorage -----------------------------------------------------------

 function updateWinCount(playerName, count) {
  localStorage.setItem(`winCount_${playerName}`, count);

  let topPlayerName = localStorage.getItem("topPlayerName") || "";
  let topPlayerCount = localStorage.getItem("topPlayerCount") || 0;

  if (count > topPlayerCount) {
    localStorage.setItem("topPlayerName", playerName);
    localStorage.setItem("topPlayerCount", count);
    topPlayerName = playerName;
    topPlayerCount = count;
  }
}



// viktigt ----------------------------------------------------------------
function matchCards(img1, img2) {
    if(img1 === img2) {
        matched++;
        addToHistory(img1, currentPlayer)
        if (currentPlayer === player1) {
            player1Score++;
          } else {
            player2Score++;
          }
      
          // Update the score display
          updateScoreDisplay();
        if(matched === 12) {
            winner = player1Score > player2Score ? player1 : player2;
            
            if ( player1Score > player2Score) {
                winner = player1
                winnerscore1++;
            updateWinCount(player1, winnerscore1);
            } else if ( player1Score < player2Score) {
                winner = player2;
                winnerscore2++;
                updateWinCount(player2, winnerscore2);
            } else {
                winner = "Oavgjort"
            }
            displayWinner(winner);
            setTimeout(() => {  
                resetGame()
                
                return shuffleCard();
            }, 1000);
        } 
        
        if ( matched !== 12 && currentPlayer === "Dator" && mode === "computer") {
          cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
          cardOne = cardTwo = "";
        disableDeck = false;
        setTimeout( flipComputerCardHelper, 1000)
          
        } else if (matched !== 12 && currentPlayer === player1 && mode === "computer"){
          cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
          cardOne = cardTwo = "";
        disableDeck = false;
        }
        
        else if ( matched !== 12 && mode !== "computer") {
          cardOne.removeEventListener("click", flipCard);
          cardTwo.removeEventListener("click", flipCard);

        }
        cardOne = cardTwo = "";
        return disableDeck = false;
    } else {
      setTimeout(switchPlayers,1000)
        
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

function switchPlayers() {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    turnTitle.textContent = `${currentPlayer}s tur`
    if (currentPlayer === "Dator") {
        // If the current player is the computer, delay the computer's turn
        setTimeout(flipComputerCardHelper, 1300); // Adjust the delay as needed
      }
}

function updateScoreDisplay() {
  if (currentPlayer === player1) {
    player1ScoreDisplay.textContent = player1Score;
  } else {
    player2ScoreDisplay.textContent = player2Score;
  }
}

function addToHistory(match, player) {
  const matchTexts = {
    "images/img-1.png": "hittade PHP",
    "images/img-2.png": "hittade HTML",
    "images/img-3.png": "hittade CSS",
    "images/img-4.png": "hittade JavaScript",
    "images/img-5.png": "hittade React",
    "images/img-6.png": "hittade Angular",
    "images/img-7.png": "hittade Vue",
    "images/img-8.png": "hittade Sass",
    "images/img-9.png": "hittade NodeJs",
    "images/img-10.png": "hittade Bootstrap",
    "images/img-11.png": "hittade Tailwind",
    "images/img-12.png": "hittade Wordpress",
  };

  const matchText = `${player} ${matchTexts[match]}`;
  const listHistoryItem = document.createElement("li");
  listHistoryItem.textContent = matchText;
  historyContainer.appendChild(listHistoryItem);
  historyContainer.scrollTop = historyContainer.scrollHeight;
}
function displayWinner(winnerName) {
  gameContainer.classList.toggle("disable");
  winnerPopup.classList.toggle("hide");
  winnerPopup.querySelector(".winner").textContent = winnerName;
}
function clearHistory() {
  // Remove all child elements from the history container
  while (historyContainer.firstChild) {
    historyContainer.removeChild(historyContainer.firstChild);
  }
}
function resetGame() {
  clearHistory();
  player1Score = 0;
  player2Score = 0;
  player1ScoreDisplay.textContent = player1Score;
  player2ScoreDisplay.textContent = player2Score;
  currentPlayer = player1;
  turnTitle.textContent = `${currentPlayer}s tur`;
  shuffleCard();
}

// viktigt ----------------------------------------------------------------
function shuffleCard() {
  matched = 0;
  disableDeck = false;
  cardOne = cardTwo = "";
  let arr = [];
  for (let i = 1; i <= cards.length / 2; i++) {
    arr.push(i, i);
  }
  // let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
  cards.forEach((card, i) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector(".back-view img");
    imgTag.src = `images/img-${arr[i]}.png`;
    card.addEventListener("click", flipCard);
  });
}

shuffleCard();

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
