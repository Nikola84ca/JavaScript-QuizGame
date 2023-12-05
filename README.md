# JavaScript Quiz Game


Project and development of web page for a JavaScript quiz game. The game consists of a series of questions with multiple choice answers, a timer countdown that starts at 75 seconds but gets decreased of 10 seconds at every wrong answer, a form to insert the player initials and a second page that shows the ordered list of best scores, with the opportunity, through a specific button, to reset it as well.

## About Me 
Born and raised in Italy, I moved to the UK in 2015. I have always been interested in new technologies and IT, as I studied IT in my A levels back in Italy. After 5 years working in content management for a website, I decided to make the step of learning Front-End Development thanks to the edX course, and on my gitHub profile I showcase not only my progress in Front-End Development as a student but also a journey that hopefully will lead to new exciting projects in this field.

## Usage

You can visit the JavaScript Quiz Game website by clicking [HERE](https://nikola84ca.github.io/JavaScript-QuizGame/). Alternatively to the url above, you can clone the repository on your device as shown in the Installation section below and access the index.html file by opening it in your browser. Here is a gif animation of the step-by-step procedure to generate your password:

![Gif animation of how to play the game](/assets/images/JavaScript-Coding-Quiz.gif)

## Installation
First, make sure that Git and Git Bash are installed on your system. To download this project on your machine click [HERE](https://github.com/Nikola84ca/JavaScript-QuizGame) to go to the repository on GitHub. Click on the green CODE button, and copy the link of the repository. In your machine, open gitBash and create a new folder where you will clone the project using the command below:

```bash
Git mkdir your-project-folder
```
navigate inside the new folder, and clone the project files with the following comands

```bash
cd your-project-folder
Git clone url-copied-on-repository
git pull
```

Open your editor with the command

```bash
code .
```

alternatively download the zip file in GitHub after pressing the Code button, unzip it and copy it in your project folder. Navigate to the folder using the cd command on gitbash and lounch your editor as shown above with code . To open the Password Generator page simply open the index.html file on your browser and follow the procedure as shown in the following animation:

![Gif animation of how to use the Password Generator website](/assets/Images/password-generator-test-animation.gif)

## Website Description 

The website is a two-page site that will use JavaScript to manipulate the HTML of the two pages to collect informations from the user with click events, and other methods. Once the page has been loaded by your browser, the page will explain the rules of the game, and the countdown is set to 75 seconds. Once the user presses start, the first question is shown. The user will receive 10 points for each correct answer and will lose 10 seconds from the countdown for every incorrect answer. At the end of the questions or when the timer is at 0, the user will be shown the total score, and a form where he can enter the initials. Once sumbitted the users are redirected to the highest scores page, that shows a list of the best games. There the users have the chance to clear the database of the scores and/or go back to the beginning of the game to do another round. Once the page is loaded, the users will:

* Start the quick by pressing the Start Quiz button.

* Read the questions of the Quiz and answer by choosing one among the 4 options available.

* Insert their initials at the end of the game to view the Highest Scores page.

* Choose to play another round and/or reset the Highest Scores database by pressing the relative buttons.


## My Process

* The first thing I did was noticing that the two html file included the JavaScript links in the body section.
Here are the links in the index.html file:

```HTML
    <script src="./assets/js/questions.js"></script>
    <script src="./assets/js/logic.js"></script>
```
Here is the link in the highscores.html file:

```HTML
    <script src="./assets/js/scores.js"></script>
```

* Then I created the relative .js files and started implementing the questions.js file, which stores an array of objects. I decided to opt for this option as it is the most functional and easy to implement. Every object in the array is a question that has a text for the question copy, an array containing the four possible answers and a property containing the correct answer that we'll use later to check if the user selected the correct answer or not. Here is how I implemented the array:

```JavaScript
let questions = [
    {
      questionText: "What is JavaScript?",
      answers: ["A pastry shop", "A Chinese Restaurant", "A programming language", "An elicopter"],
      correctAnswer: "A programming language"
    },
    {
      questionText: "What does JavaScript use loops for?",
      answers: ["To wash dishes", "Fry potatoes", "Implement a series of instructions and comparisons", "update the colors of the background of your desktop"],
      correctAnswer: "Implement a series of instructions and comparisons"
    },
    {
      questionText: "What happens if you don't declare a variable in JS?",
      answers: ["The code won't work", "A puppy cries", "Your PC will restart", "Your mouse will run away"],
      correctAnswer: "The code won't work"
    },
    {
     questionText: "What does i++ do?",
     answers: ["Creates a new object", "Increments the value of i in a loop", "Checks for bugs", "Makes your code run faster"],
     correctAnswer: "Increments the value of i in a loop"
      },
  ];
  
```

* Once I defined the data sets, I started working on the logic.js file, and the first thing I did was to set avariable for the timer ( to 75 seconds ) and declared also another variable timerInterval, that will be necessary to subtract the seconds in the countdown and update the time as well. I made sure that the first thing these variable do is to show the time on the screen, so I used the time id in the html to assign the variable value:

```JavaScript
let timer = 75; // This is the timer variable with its initial time of 75 seconds
// timerInterval is a fundamental variable as it will help us implement the function to decrement the countdown
let timerInterval; 

// This displays the initial time to the user
document.getElementById("time").textContent = timer;
```

* Now that the timer variables are set I decided to implement the beginning of the game with an event that collects the click of the user on the start game button. 

```JavaScript
// startButton finds the "Start Quiz" button by its id from the HTML
let startButton = document.getElementById("start");

// I then added an event listener to start the quiz when the button is clicked
startButton.addEventListener("click", startQuiz);

```

* Now that I have the input from the user to start the game I implemented the following startQuiz function. It is triggered when the click event from the user is collected after they click on the start game button. The first thing I do is to hide the with the relative class the start screen with the game rules, and show the first question by calling the relative div questions. at this point the timerIntervals, thanks to the setInterval function starts the countdown and shows it on the screen for the users. 

```JavaScript
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

```

* Now that the game is started I implemented the functions that collects the user clicks and shows the questions while collecting the clicks on the answers buttons.

```JavaScript
function handleAnswerClick(event) {
    let userAnswerIndex = parseInt(event.target.getAttribute("data-index"), 10);
    checkAnswer(userAnswerIndex);
}


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
```  

* Now that we got the functions to collect the user choices we have to check if the answer is correct, if it is we increment the user's score and show the next question until we reach the endof the array of questions, if the question is wrong the score will not be incremented and the timer will lose 10 seconds. An important step was to add also to make sure that if the timer is at zero we end the game. Here is the code:

```JavaScript
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
```

![Gif animation of wrong answer -10 seconds](/assets/images/JavaScript-Coding-Quiz-wrong-answer.gif)


* Here I implemented the endQuiz function, it is fundamental to make allow the user to enter the initials for the highest scores page. When we finish with all the questions or the timer is up the firt thing to do is to stop the timer interval, hide the questions div and show the end-screen message with the button to submit the initials and the final score of the game. The code will hide the questions div and show the end screen and final score of the game, allowing the user to insert the initials. I also implemented an extra condition that, in case the user didn't answer any questions but the timer ends to the zero, it will end the game anyway and will show the initials input. Here is the function:

```JavaScript
function endQuiz() {

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

```
* Finally, when the user clicks submit, the score and the initials will be stored and we will redirect the player to the highscores page.

```JavaScript
let submitButton = document.getElementById("submit");
submitButton.addEventListener("click", submitScore);

function submitScore() {
    let initials = document.getElementById("initials").value;
    saveScore(initials, score);
    window.location.href = "highscores.html";
}
```

* Now that the user has been redirected to the highscores page, I needed to make sure all the scores and initials of the possible multiple games are stored and listed, untill the user decides to erase the list by clicking the relative button. The first function I implemented was the saveScore, which retrieves existing scores from storage or initialize an empty array then sort the values in order:

```JavaScript
function saveScore(initials, score) {
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    // Add the current score and initials
    highScores.push({ initials, score });

    // Sort scores in descending order
    highScores.sort((a, b) => b.score - a.score);

    // Store the updated scores back to storage
    localStorage.setItem("highScores", JSON.stringify(highScores));
}
```

* Now we use the value returned by the saveScore function to display the list of high scores. I implemented the function displayHighScores so that it retrieves existing scores from the storage and if there are none then initializes an empty array. To do so, the first thing I did was to add the current scores and initials, then sort the scores in descending order and finally store the updated scores back in the storage. Here is the function saveScore:

```JavaScript
function saveScore(initials, score) {

    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    highScores.push({ initials, score });

    highScores.sort((a, b) => b.score - a.score);

    localStorage.setItem("highScores", JSON.stringify(highScores));
}
```

* Once I saved and ordered the high scores I call the displayHighScores function:
 
```JavaScript
document.addEventListener("DOMContentLoaded", displayHighScores);
```


* One of the requirement was to let the user clear the high score list when clicking the relative button, to do that I simply used the removeItem function on the localStorage, cancelling the data of highScores, then called again the function to displayHighScores to show the empty list:

```JavaScript
let clearButton = document.getElementById("clear");

function clearHighScores() {
    localStorage.removeItem("highScores");
    displayHighScores();
}
```


* Lastly I added an event listener to clear highscores when the button is clicked

```JavaScript
if (clearButton) {
    clearButton.addEventListener("click", clearHighScores);
}
```

![Gif animation of end game initials input, high score list and clear high score function](/assets/images/JavaScript-Coding-Quiz-EndGame-Clear-HighScores.gif)


## Credits

I would like to thank all the teachers and TA of the EdX bootcamp for all the content provided and study materials. Credits to [developer.mozilla.org](https://developer.mozilla.org/) for the excellent article about Web APIs, you can read it [HERE](https://developer.mozilla.org/en-US/docs/Web/API/Window) .

## Project Status and Upcoming Improvements

The Webpage is functional and easy to navigate, yet some more interactive CSS and some more function could give the user a better experience. The "engine" of the website works well, and the next step will be to implement the audio effects that will play everytime the user selects and answer. The incorrect.wav file will play when the user selects a wrong answer, while the correct.wav file will play when the user selected the correct answer.

## Collaborations and Contributions

I welcome all the brilliant coders out there to join me in this project. Join effort can result in a fundamental learning experience for a beginner coder like me, so feel free to reach out with tips and advice. If you want to contribute to this project, pull requests are welcome, but if you want to make major changes, please open an issue first so that we can discuss what you would like to change. You can contact me on my GitHub profile [HERE](https://github.com/Nikola84ca) and visit this project repository by clicking [HERE](https://github.com/Nikola84ca/JavaScript-QuizGame).

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

## License

[MIT](https://choosealicense.com/licenses/mit/)