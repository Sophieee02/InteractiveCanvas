const words = ["apple", "banana", "grape", "mango", "orange", "kiwi", "peach"];
let secretWord;
let attempts;
const maxAttempts = 5;

const guessInput = document.getElementById("guessInput");
const resultText = document.getElementById("result");
const hintText = document.getElementById("hint");
const restartBtn = document.getElementById("restartBtn");
const body = document.body;

function startGame() {
    secretWord = words[Math.floor(Math.random() * words.length)]; 
    attempts = maxAttempts;
    console.log("Secret word:", secretWord);

    resultText.textContent = "";
    resultText.className = "";
    guessInput.value = "";
    restartBtn.style.display = "none";
    hintText.textContent = `Hint: The word starts with '${secretWord.charAt(0).toUpperCase()}'`;
    body.className = "";
}

function checkGuess() {
    let guess = guessInput.value.trim().toLowerCase();

    if (guess === "") {
        resultText.textContent = "Please enter a valid guess!";
        return;
    }

    if (guess === secretWord) {
        resultText.textContent = "🎉 Congratulations! You guessed the secret word!";
        resultText.className = "win";
        body.classList.add("win");
        restartBtn.style.display = "block";
    } else {
        attempts--;
        if (attempts > 0) {
            resultText.textContent = `❌ Incorrect guess. You have ${attempts} attempts left. Try again!`;
        } else {
            resultText.textContent = `💀 Game over! The secret word was '${secretWord}'.`;
            resultText.className = "lose";
            body.classList.add("lose");
            restartBtn.style.display = "block";
