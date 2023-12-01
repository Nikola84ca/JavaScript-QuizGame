let timer = 75; // Initial time in seconds

// Display the initial time
document.getElementById("time").textContent = timer;

// Set up an interval to update the timer every second
let timerInterval = setInterval(function () {
    // Update the timer
    timer--;

    // Display the updated time
    document.getElementById("time").textContent = timer;

    // Check if the timer has reached 0
    if (timer <= 0) {
        clearInterval(timerInterval); // Stop the interval
        // Additional logic when the timer reaches 0 (e.g., endQuiz())
    }
}, 1000); 


// if the answer is wrong remove time from timer

// else pass to the other question until timer is over

// ask the user the name and store it with the score

