// List of questions
////////////////////////////////////////////////////////////////////////////////////
var question1 = "Commonly used data types DO NOT include:";
var question1Answer = ["strings", "booleans", "alerts", "numbers"];
var question2 = "Arrays in javascript can be used to store:";
var question2Answer = ["numbers and strings", "other arrays", "booleans", "all of the above"];
var question3 = "String values must be enclosed within _____ when being assigned to variables.";
var question3Answer = ["commas", "curly brackets", "quotes", "parentheses"];
var question4 = "A very useful tool used during development and debugging for printing content to the debugger is:";
var question4Answer = ["JavaScript", "terminal/bash", "for loops", "console.log"];
var question5 = "The condition in an if / else statement is enclosed within _____.";
var question5Answer = ["quotes", "curly brackets", "parentheses", "square brackets"];
var done = "All done!";
var scores = "High Scores:";
var title = "Coding Quiz Challenge";
//////////////////////////////////////////////////////////////////////////////////////

//correct answers
var correctAnswers = 0;
var correctCheck = document.getElementById('rightOrWrong');
var scoreSubmit = document.getElementById('scoreSubmissions');
var score = document.getElementById('score');

//array of questions
var question = document.getElementById("question");

// All page buttons
const startButton = document.getElementById("startButton");
const btn1 = document.getElementById("Q1");
const btn2 = document.getElementById("Q2");
const btn3 = document.getElementById("Q3");
const btn4 = document.getElementById("Q4");
var choiceArray = [btn1, btn2, btn3, btn4];
var questionWrapper = document.getElementById("questions");
var submitScore = document.getElementById("submitScore");
var scoresOption = document.getElementById("scoresOptions");
var backButton = document.getElementById("backButton");
var clearScores = document.getElementById("clearScores");
var viewScore = document.getElementById("viewScore");
//////////////////////////////////////////////////////////////////////////////////

//containers for the main quiz and leaderboard
var listContainer = document.getElementById("listContainer");
var highScoreList = document.getElementById("highScoreList");
var scoreListContainer = document.getElementById("scoreListContainer");
//Pre-quiz guide
const guide = document.getElementById("guide");

//
const questionPhrase = document.getElementsByClassName("question");
var title = document.getElementById("title");
var questionList = document.getElementById("question-list");

//timer
var timer = document.getElementById("time");

//keep track of what the current question is
var index = 0;

//list of initials for leaderboard
var initials = [];
var highScores = [];

//array of objects with questions and answers
var questions = [
    {
        question: question1,
        answers: question1Answer,
        correctAnswer: "alerts"
    },
    {
        question: question2,
        answers: question2Answer,
        correctAnswer: "all of the above"
    },
    {
        question: question3,
        answers: question3Answer,
        correctAnswer: "quotes"
    },
    {
        question: question4,
        answers: question4Answer,
        correctAnswer: "console.log"
    },
    {
        question: question5,
        answers: question5Answer,
        correctAnswer: "parentheses"
    }



]


//add event listener on start button 
startButton.addEventListener("click", () => {
    runQuiz();




});

//if any BUTTON(quiz answer) is clicked
questionList.addEventListener("click", (e) =>{
   
console.log("clicked inside the list container");
const isButton = e.target.nodeName === "BUTTON";

//checks to see if the clicked element is a button since
//bubbling was used in the event listener
if(!isButton){
    console.log("not a button");
    return;
}


//gets the #id of the button clicked and checks the inngerHTML(the answer text) and checks if it is correct
if(document.getElementById(String(e.target.id)).innerHTML == questions[index - 1].correctAnswer){
    correctAnswers += 1;
    console.log("correct answer");
    correctCheck.innerHTML = "Correct!";
}
else{
    correctCheck.innerHTML = "Wrong!";
}
console.log(document.getElementById(String(e.target.id)).innerText + " == " + questions[index - 1].correctAnswer);


    

changeQuestion(index);




});


//upon submitting add initials to leaderboard
submitScore.addEventListener("click", () => {
    console.log("submit score clicked");
    var initial = document.getElementById('initials').value;
    console.log(initials);
    //add initials to the list
    initials.push(initial);


    showLeaderboard();
});

//event listener for back button

backButton.addEventListener("click", () => {
    console.log("back button clicked");
    question.innerHTML = "Coding Quiz Challenge";

    resetQuiz();
});

//event listener for clearing high scores

clearScores.addEventListener("click", () => {
    console.log("clear scores clicked");
    initials = [];
    highScores = [];


    highScoreList.replaceChildren();

    showLeaderboard();
});

viewScore.addEventListener("click", () => {
    console.log("view score clicked");
    guide.classList.add('remove');
    startButton.classList.add('remove');
    questionList.classList.add('remove');

    showLeaderboard();
});

//Main quiz function that removes the main menu buttons and text
function runQuiz() {



    console.log("running quiz");
    startButton.classList.add('remove');
    //guide.classList.add('remove');
    questionList.classList.remove('remove');
    guide.classList.add('remove');
    correctCheck.classList.remove('remove');
    // guide.innerText = questions[1];
    changeQuestion(index);
    startTimer();


}

//timer function fro the quiz
var clock;
function startTimer() {
    var timeLeft = 30;
    clock = setInterval(function () {
        timeLeft--;
        timer.innerText = "Time: " + timeLeft;
        console.log(timeLeft);
        if (timeLeft <= 0) {
            clearInterval(clock);
            //show leaderboard
            endQuiz();
            return;
        }
    }, 1000);
}






//function for loading questions and answers from the array
function changeQuestion(ind) {
    //if you are at the last question then end the quiz
    if(ind == questions.length){
        endQuiz();
        return;
    }
    // guide.innerText = questions[i];
    console.log("change question");
    question.innerText = questions[ind].question;
    console.log()
    //fill each button with the answer choices
    for(var i = 0; i < choiceArray.length; i++) {
        choiceArray[i].innerText = questions[ind].answers[i];
        console.log(questions[ind].answers[i]);
    }
    // iterate the index for the next question call
    console.log("index before addition " + index);

    index += 1;
    console.log("index after addition " + index);

}

//brings back the main menu buttons and text
function resetQuiz() {
    correctAnswers = 0;
    index = 0;
    guide.classList.remove('remove');
    scoresOption.classList.add('remove');
    scoreListContainer.classList.add('remove');
    startButton.classList.remove('remove');

    // question.innerHTML = title;

}

function endQuiz() {
    clearInterval(clock);
    //show the end screen
    highScores.push(correctAnswers);
    questionList.classList.add('remove');
    // guide.classList.remove('remove');
    scoreSubmit.classList.remove('remove');
    //show the score
    question.innerHTML = "All done!";
    score.innerHTML = "Your score is: " + correctAnswers + " out of " + questions.length + " !";
    //reset the quiz
    //resetQuiz();
}

//loads and display the leaderboard
function showLeaderboard() {

    scoreSubmit.classList.add('remove');
    correctCheck.classList.add('remove');
    scoresOption.classList.remove('remove');

    for(var i in initials){
        var label = document.createElement("label");
        label.setAttribute("for", initials[i]);
        label.innerHTML = String(initials[i]) + ": " + highScores[i];
        highScoreList.appendChild(label);
    }
    scoreListContainer.classList.remove('remove');

    question.innerHTML = "High Scores";
    console.log(score);
    //show the leaderboard
    // var leaderboard = document.getElementById("leaderboard");
    // leaderboard.classList.remove('remove');
    // leaderboard.innerHTML = scores;
}