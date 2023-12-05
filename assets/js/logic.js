

let timer = 75; // Initial time in seconds
let timerInterval; 

// Display the initial time
document.getElementById("time").textContent = timer;

// Find the "Start Quiz" button by its id
let startButton = document.getElementById("start");

// Add an event listener to start the quiz when the button is clicked
startButton.addEventListener("click", startQuiz);


function startQuiz() {
    // Hide the start screen
    document.getElementById("start-screen").classList.add("hide");
    
    // Show the questions div
    document.getElementById("questions").classList.remove("hide");

    // Start the timer interval
    timerInterval = setInterval(function () {
        // Update the timer
        timer--;

        // Display the updated time
        document.getElementById("time").textContent = timer;

        // Check if the timer has reached 0
        if (timer == 0) {
            clearInterval(timerInterval); // Stop the interval
            // Additional logic when the timer reaches 0 (e.g., endQuiz())
            // No more questions, end the quiz
        endQuiz();
        }
    }, 1000);

    // Display the first question
    displayQuestion(questions[0]);
}

// Function to display a question
function displayQuestion(question) {
    // Check if the timer has reached 0
    if (timer === 0) {
        document.getElementById("questions").classList.add("hide");
        endQuiz(); // Call endQuiz to show the initials input directly
        return; // Exit the function to prevent displaying the question
    }

    // Display the question text
    document.getElementById("question-title").textContent = question.questionText;

    // Display answer options as buttons
    let choicesContainer = document.getElementById("choices");
    choicesContainer.innerHTML = "";

    for (let j = 0; j < question.answers.length; j++) {
        let choiceBtn = document.createElement("button");
        choiceBtn.textContent = question.answers[j];
        choiceBtn.setAttribute("data-index", j); // Set data-index to identify the chosen answer
        choiceBtn.addEventListener("click", handleAnswerClick); // Add click event listener
        choicesContainer.appendChild(choiceBtn);
    }
    
}

// Function to handle the user's answer click
function handleAnswerClick(event) {
    let userAnswerIndex = parseInt(event.target.getAttribute("data-index"), 10);
    checkAnswer(userAnswerIndex);
}


let currentQuestionIndex = 0; // Track the index of the current question
let score = 0; // Initialize the score

// Function to check the user's answer
function checkAnswer(userAnswerIndex) {
    let currentQuestion = questions[currentQuestionIndex];

    // Check if the user's answer is correct
    if (userAnswerIndex === currentQuestion.answers.indexOf(currentQuestion.correctAnswer)) {
        // Correct answer
        score += 10; // Increment the score
    } else {
        // Incorrect answer
        timer -= 10; // Deduct 10 seconds from the timer
        if (timer < 0) {
            timer = 0; // Ensure the timer doesn't go below 0
        }
    }

    // Move to the next question or end the quiz if there are no more questions
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        // Display the next question
        displayQuestion(questions[currentQuestionIndex]);
    } else {
        // No more questions, end the quiz
        endQuiz();
    }
}


// Function to end the quiz
function endQuiz() {
    // Stop the timer interval
    clearInterval(timerInterval);

    // Hide the questions div
    document.getElementById("questions").classList.add("hide");

    // Display the end screen
    let endScreen = document.getElementById("end-screen");
    endScreen.classList.remove("hide");

    // Display the final score
    document.getElementById("final-score").textContent = score;

    // Check if the timer has reached 0
    if (timer === 0) {
        // Hide the questions div
        document.getElementById("questions").classList.add("hide");
        // Timer has reached 0, show the initials input directly after a short delay
        setTimeout(function() {
            document.getElementById("initials").focus();
        }, 100);
    }
}

// Additional code to handle the submission of initials 
let submitButton = document.getElementById("submit");
submitButton.addEventListener("click", submitScore);

function submitScore() {
    let initials = document.getElementById("initials").value;

    // Logic to handle saving the score and initials
    saveScore(initials, score);

    // Redirect to highscores page
    window.location.href = "highscores.html";
}

