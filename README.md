# JavaScript Quiz Game


Project and development of web page for a JavaScript quiz game. The game consists of a series of questions with multiple choice answers, a timer countdown that starts at 75 seconds but get decreased of 10 seconds at every wrong answer, a form to insert the player initials and a second page that shows the ordered list of best scores, with the opportunity, through a specific button, to reset it as well.

## About Me 
Born and raised in Italy, I moved to the UK in 2015. I have always been interested in new technologies and IT, as I studied IT in my A levels back in Italy. After 5 years working in content management for a website, I decided to make the step of learning Front-End Development thanks to the edX course, and on my gitHub profile I showcase not only my progress in Front-End Development as a student but also a journey that hopefully will lead to new exciting projects in this field.

## Usage

You can visit the JavaScript Quiz Game website by clicking [HERE](https://github.com/Nikola84ca/JavaScript-QuizGame).  Alternatively to the url above, you can clone the repository on your device as shown in the Installation section below and access the index.html file by opening it in your browser. Here is a gif animation of the step-by-step procedure to generate your password:

![Gif animation of how to use the Password Generator](/assets/Images/password-generator-test-animation.gif)

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

* Choose to do another game or reset the Highest Scores database by pressing the relative buttons.


## My Process

* The first thing I did was making sure the two html file included the JavaScript links in the body section.
Here are the links in the index.html file:

```HTML
    <script src="./assets/js/questions.js"></script>
    <script src="./assets/js/logic.js"></script>
```
Here is the link in the highscores.html file:

```HTML
    <script src="./assets/js/scores.js"></script>
```

* Then I identified the Data set given. The passwords will be created by mixing the characters inside four arrays: numericCharacters, lowerCasedCharacters, upperCasedCharacters, specialCharacters. Inside each one of these arrays we have the relative characters we will need to select randomly to create the final password. Here are two examples of the arrays:

```JavaScript
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
```
```JavaScript
var specialCharacters = ['@', '%', '[', '~', ... ];
```

* Once I identified the data sets, I broke down the structure of the code into four main functions. In order to make the website work, we need one function to obtain the input from the user, one with the general pourpose to return a random element from our arrays, one that generates the password using the random function, and a final one that prints out the generated password on the webpage.

* The first thing I did was declaring five variables with global scope: these variables will be used by more than one function and they will contain the input from the user.

```JavaScript
let length;
let hasNumbers, hasCapital, hasLower, hasSpecialChar;
```

* length will contain the number of characters the user wants to be include in the password, while hasNumbers, hasCapital etc will be boolean variables that will indicate if the user wants (true) or doesn't want (false) include a specific character type.

* At this point I started implementing the first function, called getPasswordOptions. This function main scope is to interact with the user and get the information we need to create the password. To get this data I decided to use alert and confirm prompt messages. Since I needed a specific input for the length, a number between 8 and 128, I decided to create a do/while loop that keeps looping until the user inserted the right value. Here is the code:

```JavaScript
  do {
    length = parseInt(prompt('Choose the length of your Password: type a number between 8 and 128 '));

    if (!isNaN(length) && length >= 8 && length <= 128) {
      break;
    } else {
      alert("Invalid input. Please enter a number between 8 and 128.");
    }
  } while (true);
```  
* This "if" makes sure that the input from the user is a number and if it is included in the range required between 8 and 128, I decided to include 8 and 128 as valid numbers as well. If the conditions above in the "if" are true the user's input is valid so we exit the loop and ask the Character types to be included in the password, otherwise we alert that the input is invalid and we repeat the loop asking again for the length of the password. We'll break the loop only when the length is a number between 8 and 128. Here is an example of this part of the function when the user inserts an invalid input: 

![Gif animation of invalid length input](/assets/Images/password-generator-invalid-input.gif)

* Once obtained the length, the function needs to make sure the user selects at least one of the character types stored in our arrays, so with anoter do/while loop the function presents a series of confirm prompts that ask the user the input for every character type, looping until at least one type is chosen. Here is the code:

```JavaScript
let hasAtLeastOneType;

  do {
       hasAtLeastOneType= false;
    do {
      hasNumbers = confirm('Do you want to include Numbers in your Password? ');
      hasCapital = confirm('Do you want to include Capital Letters? ');
      hasLower = confirm('Do you want to include Lower Case Letters? ');
      hasSpecialChar = confirm('Do you want to include Special Characters? ');

      if (hasNumbers || hasCapital || hasLower || hasSpecialChar) {
        hasAtLeastOneType = true;
      } else {
        alert("You must select at least one character type.");
      }
    } while (!hasAtLeastOneType);

  } while (!hasAtLeastOneType);

```
* I decided to do a first do/while loop where the variable hasAtLeastOneType become true only when one of the global boolean variables hasNumbers, hasCapital, hasLower, or hasSpecialChar is true through the confirm. I initialized it as false to run the outer loop and looped it until, one of the conditions of the "if" was true. The function checks if at least one character type has been selected, then the variable hasAtLeastOneType becomes true and we can exit both loops, otherwise we alert the user to inform that at least one character type must be selected and we go back up in the loop representing all the confirms. We finish the loop only when at least one of the variables hasNumber, hasCapital, hasLower, or hasSpecialChar is true. Here is an example of this part of the function in case the user doesn't select a character type:

![Gif animation of invalid character type choice](/assets/Images/password-generator-type-choice.gif)


* The second function is a short one but fundamental for the whole success of this project. It is the getRandom function, a general but effective code that selects a random element from an array and returns it to the variable speficied in another function.

```JavaScript
function getRandom(arr) {
  let randomElement = arr[Math.floor(Math.random()*arr.length)];
  return randomElement;
}
```

* Now that we have the input from the user and the getRandom function to access the arrays elements randomly, I created the generatePassword function. My approach is to use a temporary password called tempPass, which is an array where the function will store the random elements from each character type chosen by the user. This tempPass will be shuffled at the end of the function to randomize even more the final password. The following loop runs until the tempPass array reaches the length chosen by the user. At every loop, it checks if the four boolean variables hasNumbers, hasCapital etc are true or false. If they are true, it means the user wants to include that specific type of character so, with a getRandom function I temporary store the random character from that array inside randomNum, randomCapital etc and then I update the tempPass by adding those characters, one after the other in the temporary password array using the push method. Here is the code followed by the explaination:

```JavaScript
function generatePassword() {
  let tempPass = [];
  while (tempPass.length < length) {
    if (hasNumbers) {
      let randomNum = getRandom(numericCharacters);
      tempPass.push(randomNum);
    }
    if (hasCapital) {
      let randomCapital = getRandom(upperCasedCharacters);
      tempPass.push(randomCapital);
    }
    if (hasLower) {
      let randomLower = getRandom(lowerCasedCharacters);
      tempPass.push(randomLower);
    }
    if (hasSpecialChar) {
      let randomSpecialChar = getRandom(specialCharacters);
      tempPass.push(randomSpecialChar);
    }
  }
```

* I could have avoid using the randomNum, randomCapital etc, but I wanted to keep the values in a separate variable in case I decide to update the function and create a second version of the randomized password. At this point I could have just returned the tempPassword using the join and slice methods, to turn it into a string of the length chosen by the user ( return tempPass.join('').slice(0, length); ). The only issue with this, even if the password is functinal and consists of random elements from the character arrays is that the characters will always appear in the same order, which is the order of the "ifs" in the loop above. This means that if the users click the generate password button again, and if they chose lowercase characters, and a number, they will always have a random lowercase character as first character, followed by a random number, then another random lowercase and so on. This is an example of the passwords generate:

        e2f4e6h8
        t7g4j3k7
        j3k8b2z3
        c5v2p5m6

 Even if they are random, this alternance doen't provide a deep security level as the algorithm is following an evident pattern, so I decided to store the tempPass into the finalPassword variable, which will be shuffled once again giving every time random characters in random positions of the array. The following joins the characters in the tempPass array and slices it to the desired length before storing it in the finalPassword variable. Then finalPassword is shuffled using the sort metod and Math.random. The three dots ... before finalPassword are the spread syntax, which is used to convert the string to an array temporarily for the purpose of shuffling.
 
```JavaScript
  let finalPassword = tempPass.join('').slice(0, length);
  finalPassword = [...finalPassword].sort(() => Math.random() - 0.5).join('');

  return finalPassword;
}
```


* Once the password has been generated and stored in the finalPassword variable, the function writePassword, connected with the HTML and CSS will write the password on the form for the user to see.

```JavaScript
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}
```


* Lastly, I made sure to call the function getPasswordOptions to initialize the process for the users once the site is loaded in their browser so that they can insert their input.

```JavaScript
getPasswordOptions();
```


## Credits

I would like to thank all the teachers and TA of the EdX bootcamp for all the content provided and study materials. Credits to [developer.mozilla.org](https://developer.mozilla.org/) for the excellent article about Web APIs, you can read it [HERE](https://developer.mozilla.org/en-US/docs/Web/API/Window) .

## Project Status and Upcoming Improvements

The Webpage is functional and easy to navigate, yet some more interactive CSS and some more function could give the user a better experience. The "engine" of the website works well, and another way to randomize the password could be made by using the Fisher-Yates algorith.

## Collaborations and Contributions

I welcome all the brilliant coders out there to join me in this project. Join effort can result in a fundamental learning experience for a beginner coder like me, so feel free to reach out with tips and advice. If you want to contribute to this project, pull requests are welcome, but if you want to make major changes, please open an issue first so that we can discuss what you would like to change. You can contact me on my GitHub profile [HERE](https://github.com/Nikola84ca) and visit this project repository by clicking [HERE](https://github.com/Nikola84ca/JavaScript-QuizGame).

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

## License

[MIT](https://choosealicense.com/licenses/mit/)