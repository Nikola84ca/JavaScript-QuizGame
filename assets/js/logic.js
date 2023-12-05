

let timer = 75; // This is the timer variable with its initial time of 75 seconds
// timerInterval is a fundamental variable as it will help us implement the function to decrement the countdown
let timerInterval; 

// This displays the initial time to the user
document.getElementById("time").textContent = timer;

// startButton finds the "Start Quiz" button by its id from the HTML
let startButton = document.getElementById("start");

// I then added an event listener to start the quiz when the button is clicked
startButton.addEventListener("click", startQuiz);

// The following startQuiz function is triggered when the click event from the user is collected after they click on the start game button. The first thing I do is to hide the with the relative class the start screen with the game rules, and show the first question by calling the relative div questions. at this point the timerIntervals, thanks to the setInterval function starts the countdown and shows it on the screen for the users. 

function startQuiz() {
    // Hides the start screen
    document.getElementById("start-screen").classList.add("hide");
    
    // Shows the questions div
    document.getElementById("questions").classList.remove("hide");

    // Starts the timer interval
    timerInterval = setInterval(function () {
        // Updates and display the timer
        timer--;
        document.getElementById("time").textContent = timer;

        // A fundamental step is to check if the timer has reached 0, in that case I will stop the interval and will end the quiz with the endQuiz function
        if (timer == 0) {
            clearInterval(timerInterval); 
            endQuiz();
        }
    }, 1000);

    // Lastly once the timer functions are set I display the first question
    displayQuestion(questions[0]);
}

// Function to display the questions
function displayQuestion(question) {
    // The first thing to do is to check if the timer has reached 0 or not, if it has we will end the Quiz
    if (timer === 0) {
        document.getElementById("questions").classList.add("hide");
        endQuiz(); // Call endQuiz to show the initials input directly
        return; // Exit the function to prevent displaying the question
    }

    // Then we display the question text and the answer options as buttons
    document.getElementById("question-title").textContent = question.questionText;
    let choicesContainer = document.getElementById("choices");
    choicesContainer.innerHTML = "";

    // At this point the fundamental step is to get the click event from the user, store the choice

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
let score = 0; // Initializes the score to zero

// Function to check the user's answer
function checkAnswer(userAnswerIndex) {
    let currentQuestion = questions[currentQuestionIndex];

    // Check if the user's answer is correct
    if (userAnswerIndex === currentQuestion.answers.indexOf(currentQuestion.correctAnswer)) {
        // Correct answer
        score += 10; // The answer is correct so we increment the score
    } else {
        // Incorrect answer
        timer -= 10; // Since the answer is wrong we remove 10 seconds from the timer
        if (timer < 0) {
            timer = 0; // This makes sure the timer doesn't go below 0
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


// The following is the function to end the quiz, it is fundamental to make allow the user to enter the initials for the highest scores page.
function endQuiz() {
    // When we finish with all the questions or the timer is up the firt thing to do is to stop the timer interval, hide the questions div and show the end-screen message with the button to submit the initials and the final score of the game.

    clearInterval(timerInterval);
    document.getElementById("questions").classList.add("hide");

    // This displays the end screen div 
    let endScreen = document.getElementById("end-screen");
    endScreen.classList.remove("hide");

    // This will display the final score of the game
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

    // This will redirect the user to highscores page
    window.location.href = "highscores.html";
}

