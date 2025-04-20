import { quizData } from "./data.js";

let currentQuestion = 0;
let score = 0;

const displayQuestion = () => {
    if (currentQuestion == quizData.length) {
        document.querySelector("body").innerHTML = `Your score is : ${score}`;
    }
    else {
        document.getElementById("quiz-question").innerHTML = quizData[currentQuestion].question;
    
        let optionList = document.createElement("ol");
        optionList.id = "quiz-options";
    
        let optionA = document.createElement("li");
        let optionB = document.createElement("li");
        let optionC = document.createElement("li");
        let optionD = document.createElement("li");
    
        optionA.innerHTML = `<input type="radio" value="a" id="a" name="question-options" /><label for="a">${quizData[currentQuestion].a}</label>`;
        optionB.innerHTML = `<input type="radio" value="b" id="b" name="question-options" /><label for="b">${quizData[currentQuestion].b}</label>`;
        optionC.innerHTML = `<input type="radio" value="c" id="c" name="question-options" /><label for="c">${quizData[currentQuestion].c}</label>`;
        optionD.innerHTML = `<input type="radio" value="d" id="d" name="question-options" /><label for="d">${quizData[currentQuestion].d}</label>`;
    
        optionList.appendChild(optionA);
        optionList.appendChild(optionB);
        optionList.appendChild(optionC);
        optionList.appendChild(optionD);
    
        document.getElementById("quiz-options-container").innerHTML = "";
        document.getElementById("quiz-options-container").appendChild(optionList);
    
        console.log(currentQuestion);
        currentQuestion++;
    }
}

const scoreTracker = () => {
    let allOptions = document.getElementsByName("question-options");
    let answer = "";
    allOptions.forEach((option) => {
        if (option.checked) answer = option.value;
    })

    if (answer == quizData[currentQuestion - 1].correct) score++;
    displayQuestion();
}

window.displayQuestion = displayQuestion;
window.scoreTracker = scoreTracker;