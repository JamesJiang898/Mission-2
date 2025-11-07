// Selecting elements from the HTML
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keybordDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModel = document.querySelector(".game-model");
const playAgianBtn = document.querySelector("button");

// Initializing game variables
let currentWord, correctletters, wrongGuesscount;
const maxGeusses = 6;

// This is our reset game fuction
const resetGame = function () {
    correctletters = [];
    wrongGuesscount = 0;
    hangmanImage.src = "images/hangman-0.svg";
    guessesText.innerText = `${wrongGuesscount} / ${maxGeusses}`;
  // create the empty letter slots
    wordDisplay.innerHTML = currentWord
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
  // enable keyboard buttons
    keybordDiv
    .querySelectorAll("button")
    .forEach((btn) => (btn.disabled = false));
  // hide the game model
    gameModel.classList.remove("show");
};

// Function to get a random word and set up the game
const getRandomWord = function () {
  //picking a random word and hint from your wordlist array
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  // Set the current word and update the hint
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
  // call reset game
    resetGame();
};

// Function to handle the end of game win or lose
const gameOver = function (isVictory) {
  //show the gameover model with win or loss
    const modelText = isVictory
    ? `You found the word: `
    : `The correct word was: `;
    gameModel.querySelector("img").src = `images/${
    isVictory ? "victory" : "lost"
    }.gif`;
    gameModel.querySelector("h4").innerText = isVictory
    ? `Congrats!`
    : `Game Over!`;
    gameModel.querySelector("p").innerHTML = `${modelText} <b>${currentWord}</b>`;
    gameModel.classList.add("show");
};

// Creating a for loop to display our keyboard buttons
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keybordDiv.appendChild(button);
  // Adding a click event listener for each button
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}

// Function to handel the game logic when a letter is clicked
const initGame = (button, clickedLetter) => {
  //checking if the clicked letter is in the current word
    if (currentWord.includes(clickedLetter)) {
    // update the displayed letters if clicked is correct
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctletters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
    // update wrong guess count and hangman image if letter guessed is incorrect
    wrongGuesscount++;
    hangmanImage.src = `images/hangman-${wrongGuesscount}.svg`;}
  // disable the clicked button so it can't be clicked agian
    button.disabled = true;
  // update the displayed guess count
    guessesText.innerText = `${wrongGuesscount} / ${maxGeusses}`;
  // check if the game should end based on win or lose conditions
  if (wrongGuesscount === maxGeusses) return gameOver(false); //lose
  if (correctletters.length === currentWord.length) return gameOver(true); //win
};

//Starting the game with a random word
getRandomWord();

//Add event listener for the play again button
playAgianBtn.addEventListener("click", getRandomWord);
