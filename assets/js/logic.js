let currentQuestionIndex = 0;
let timer = 75; // Initial time in seconds
let timerInterval;

document.getElementById("start").addEventListener("click", function () {
    startQuiz(questions);
    startTimer();
});

function startQuiz(questions) {
    displayQuestion(questions[currentQuestionIndex]);
}

function startTimer() {
    // Display the initial time
    document.getElementById("time").textContent = timer;

    // Set up an interval to update the timer every second
    timerInterval = setInterval(function () {
        // Update the timer
        timer--;

        // Display the updated time
        document.getElementById("time").textContent = timer;

        // Check if the timer has reached 0
        if (timer <= 0) {
            clearInterval(timerInterval); // Stop the interval
            endQuiz(); // End the quiz when the timer is up
        }
    }, 1000); // Update every second
}

function displayQuestion(question) {
    document.getElementById("question-title").textContent = question.questionText;
    let choicesContainer = document.getElementById("choices");
    choicesContainer.innerHTML = "";

    for (let j = 0; j < question.answers.length; j++) {
        let choiceBtn = document.createElement("button");
        choiceBtn.textContent = question.answers[j];
        choiceBtn.setAttribute("data-index", j);
        choiceBtn.addEventListener("click", handleAnswerClick);
        choicesContainer.appendChild(choiceBtn);
    }
}

function handleAnswerClick(event) {
    let userAnswerIndex = parseInt(event.target.getAttribute("data-index"), 10);
    checkAnswer(userAnswerIndex);

    // Move to the next question
    currentQuestionIndex++;

    // Check if there are more questions
    if (currentQuestionIndex < questions.length) {
        // Display the next question
        displayQuestion(questions[currentQuestionIndex]);
    } else {
        // Quiz completed logic
        endQuiz();
    }
}

function checkAnswer(userAnswerIndex) {
    let correctAnswer = questions[currentQuestionIndex].correctAnswerIndex;
    if (userAnswerIndex !== correctAnswer) {
        // Incorrect answer, deduct 10 seconds from the timer
        timer -= 10;
    }
}

function endQuiz() {
    // Stop the timer interval
    clearInterval(timerInterval);

    // Display the final score and perform other end-of-quiz actions
    document.getElementById("final-score").textContent = timer;
    document.getElementById("questions").classList.add("hide");
    document.getElementById("end-screen").classList.remove("hide");
}


// if the answer is wrong remove time from timer

// else pass to the other question until timer is over

// ask the user the name and store it with the score

