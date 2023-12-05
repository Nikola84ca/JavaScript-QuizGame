// Function to save the scores and initials, store them and sorts them in descending order.
function saveScore(initials, score) {

    // Retrieves existing scores from the storage and if there are none then initializes an empty array
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    // First we add the current score and initials
    highScores.push({ initials, score });

    // Then we sort scores in descending order
    highScores.sort((a, b) => b.score - a.score);

    // And finally we store the updated scores back to storage
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

// Function to display high scores
function displayHighScores() {
   
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    // Displays high scores in the ordered list element
    let highScoresList = document.getElementById("highscores");

    // Check if the highScoresList element exists before manipulating it
    if (highScoresList) {
        highScoresList.innerHTML = "";

        for (let i = 0; i < highScores.length && i < 10; i++) {
            let listItem = document.createElement("li");
            listItem.textContent = `${highScores[i].initials}: ${highScores[i].score}`;
            highScoresList.appendChild(listItem);
        }
    }
}

// Call the displayHighScores function when the page is fully loaded
document.addEventListener("DOMContentLoaded", displayHighScores);

// Find the "Clear Highscores" button by its id
let clearButton = document.getElementById("clear");

// Function to clear high scores
function clearHighScores() {
    // Clear the high scores stored in local storage
    localStorage.removeItem("highScores");

    // After clearing the highScores I want to display the high scores which now is empty so the page will be cleared
    displayHighScores();
}



// Lastly I add an event listener to clear highscores when the button is clicked
if (clearButton) {
    clearButton.addEventListener("click", clearHighScores);
}