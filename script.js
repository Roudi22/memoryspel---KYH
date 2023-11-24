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
    currentPlayer = player1Input.value;
    
    turnTitle.textContent = `${currentPlayer}s tur`
    player1 =  player1Input.value;
    player2 =  player2Input.value;

    const player1Name = player1Input.value.trim();
    const player2Name = player2Input.value.trim();

    document.getElementById("player1-name").textContent = player1Input.value;
    currentPlayer = player1Input.value;
    document.getElementById("player2-name").textContent = player2Input.value;
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
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
    
}

function matchCards(img1, img2) {
    if(img1 === img2) {
        matched++;

        if (currentPlayer === player1) {
            player1Score++;
          } else {
            player2Score++;
          }
      
          // Update the score display
          updateScoreDisplay();


        if(matched === 12) {
            setTimeout(() => {
                winner = player1Score > player1Score ? player1 : player2;
                console.log(winner)
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
        const player1ScoreDisplay = document.querySelector(
          ".players-points p:nth-child(1) #score"
        );
        player1ScoreDisplay.textContent = player1Score;
    } else {
        const player2ScoreDisplay = document.querySelector(
          ".players-points p:nth-child(2) #score"
        );
        player2ScoreDisplay.textContent = player2Score;
    }
  }

function shuffleCard() {
    player1Score = 0;
    player2Score = 0;
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