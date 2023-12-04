// Function to save the score and initials
function saveScore(initials, score) {
    // Logic to save the score and initials (customize based on your needs)
    // For example, you can store it in local storage or send it to a server.

    // Retrieve existing scores from storage (or initialize an empty array)
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    // Add the current score and initials
    highScores.push({ initials, score });

    // Sort scores in descending order
    highScores.sort((a, b) => b.score - a.score);

    // Store the updated scores back to storage
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

// Function to display high scores
function displayHighScores() {
    // Retrieve scores from storage
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    // Display high scores in the ol element
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