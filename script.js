const twoPlayersBtn = document.getElementById("two-players");
const againstComBtn = document.getElementById("against-com");
const twoPlayersPopup = document.querySelector(".two-players");
const againstComPopup = document.querySelector(".against-com");
const twoPlayersStartBtn = document.getElementById("two-players-start-btn");
const againstComStartBtn = document.getElementById("against-com-start-btn");
const modePopup = document.querySelector(".popup-mode");
const gameContainer = document.querySelector(".container");
const turnTitle = document.querySelector(".turn")
const player1Input = document.getElementById("player1c");
const player2Input = document.getElementById("player2");
const resetGameBtn = document.querySelector(".reset-game");
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
let winner;
let mode;

twoPlayersBtn.addEventListener("click", () => {
    mode = "players"
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
    if (player1Name.length > 4 && player2Name.length > 4) {
        twoPlayersPopup.classList.toggle("hide");
        gameContainer.classList.remove("disable")
    } else {
      alert("Invalid input! Player name must not be empty and should contain at least 4 characters.");
    }
});
  
againstComStartBtn.addEventListener("click", () => {
    const player1Input = document.getElementById("player1");
    const player1Name = player1Input.value.trim();
  
    if (player1Name.length > 4) {
        againstComPopup.classList.toggle("hide")
        gameContainer.classList.remove("disable")
    } else {
      alert("Invalid input! Player name must not be empty and should contain at least 4 characters.");
    }
});

resetGameBtn.addEventListener("click", ()=> {
    resetGame();
})

restartGameBtn.forEach((btn)=> {
    btn.addEventListener("click", ()=> {
        location.reload();
    })
})

const cards = document.querySelectorAll(".card");
let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard({target: clickedCard}) {
    
    if(cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").getAttribute("src"),
        cardTwoImg = cardTwo.querySelector(".back-view img").getAttribute("src");
        matchCards(cardOneImg, cardTwoImg);
    }
    
}

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
            } else if ( player1Score < player2Score) {
                winner = player2
            } else {
                winner = "Oavgjort"
            }
            displayWinner(winner);
            setTimeout(() => {  
                resetGame()
                
                return shuffleCard();
            }, 1000);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    } else {
        switchPlayers();
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
}

function updateScoreDisplay() {
    if(currentPlayer === player1) {
        player1ScoreDisplay.textContent = player1Score;
    } else {
        player2ScoreDisplay.textContent = player2Score;
    }
  }

  function addToHistory (match, player) {
    const matchTexts = {
        "images/img-1.png":"hittade PHP",
        "images/img-2.png":"hittade HTML",
        "images/img-3.png":"hittade CSS",
        "images/img-4.png":"hittade JavaScript",
        "images/img-5.png":"hittade React",
        "images/img-6.png":"hittade Angular",
        "images/img-7.png":"hittade Vue",
        "images/img-8.png":"hittade Sass",
        "images/img-9.png":"hittade NodeJs",
        "images/img-10.png":"hittade Bootstrap",
        "images/img-11.png":"hittade Tailwind",
        "images/img-12.png":"hittade Wordpress",
    }
    
    const matchText = `${player} ${matchTexts[match]}`
    const listHistoryItem = document.createElement("li");
    listHistoryItem.textContent = matchText;
    historyContainer.appendChild(listHistoryItem);
    historyContainer.scrollTop = historyContainer.scrollHeight;
  }
function displayWinner(winnerName) {
    gameContainer.classList.toggle("disable")
    winnerPopup.classList.toggle("hide");
    winnerPopup.querySelector(".winner").textContent = winnerName
}
function clearHistory() {
    // Remove all child elements from the history container
    while (historyContainer.firstChild) {
      historyContainer.removeChild(historyContainer.firstChild);
    }
  }
  function resetGame () {
    clearHistory();
    player1Score=0;
    player2Score=0;
    player1ScoreDisplay.textContent = player1Score;
    player2ScoreDisplay.textContent = player2Score;
    currentPlayer = player1;
    turnTitle.textContent = `${currentPlayer}s tur`
    shuffleCard();
  }
function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";
    let arr = [];
  for (let i = 1; i <= cards.length / 2; i++) {
    arr.push(i, i);
  }
    // let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `images/img-${arr[i]}.png`;
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();
    
cards.forEach(card => {
    card.addEventListener("click", flipCard);
});