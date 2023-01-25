const quiz = [
    {
        question: "What is the keyword used to declare a variable in JavaScript?",
        options: ["var", "let", "const", "define"],
        answer: "var"
    },
    {
        question: "What is the syntax for an object in JavaScript?",
        options: ["{}", "()", "[]", "<>"],
        answer: "{}"
    },
    {
        question: "What is the correct syntax for an if-else statement in JavaScript?",
        options: ["if i == true else", "if (i == true) else", "if (i == true) {} else {}", "if i = true then"],
        answer: "if (i == true) {} else {}"
    },
];

let timeLeft = 90;
let score = 0;
let currentQuestion = 0;
let intervalId;

const startQuiz = document.getElementById("start-button");
const form = document.getElementById("quiz-form");
const results = document.getElementById("results");

startQuiz.addEventListener("click", start);
form.addEventListener("submit", checkAnswer);

function start() {
    const intro = document.getElementById("intro");
    intro.style.display = "none";
    startQuiz.style.display = "none";
    form.style.display = "block";
    form.addEventListener("click", e => {
        if (e.target.classList.contains("option")) {
            checkAnswer(e);
        }
    });
    showQuestion();
    countdown();
}

function showQuestion() {
    form.innerHTML = "";
    if (currentQuestion === quiz.length) {
        showResults();
        return;
    }
    const question = quiz[currentQuestion];
    const questionEl = document.createElement("h2");
    questionEl.innerHTML = question.question;
    form.appendChild(questionEl);
    question.options.forEach(option => {
        const optionEl = document.createElement("button");
        optionEl.classList.add("option");
        optionEl.name = "answer";
        optionEl.value = option;
        optionEl.innerHTML = option;
        optionEl.addEventListener("click", checkAnswer);
        form.appendChild(optionEl);
    });
}

function countdown() {
    const timer = document.getElementById("timer");
    intervalId = setInterval(() => {
        timeLeft--;
        timer.innerHTML = `Time left: ${timeLeft} seconds`;
        if (timeLeft === 0) {
            clearInterval(intervalId);
            showResults();
        }
    }, 1000);
}

function checkAnswer(e) {
    e.preventDefault();
    const options = document.querySelectorAll(".option");
    options.forEach(option => {
        if (option === e.target) {
            option.setAttribute("checked", true);
        } else {
            option.removeAttribute("checked");
        }
    });
    const selectedOption = document.querySelector('.option[checked]');
    const message = document.getElementById("message");
    if (selectedOption.value === quiz[currentQuestion].answer) {
        score += 10;
        message.innerHTML = "Correct!";
        message.style.color = "green";
    } else {
        timeLeft -= 10;
        message.innerHTML = "Wrong!";
        message.style.color = "red";
    }
    currentQuestion++;
    showQuestion();
}

function showResults() {
    form.style.display = "none";
    results.style.display = "block";
    results.innerHTML = `
        <h2>Quiz Results</h2>
        <p>Score: ${score}</p>
        <p>Time Left: ${timeLeft} seconds</p>
    `;
    let name = prompt("Enter your name:");
    localStorage.setItem(name, score);
    clearInterval(intervalId);
    showHighScores();
}

function saveHighScore() {
    let name = prompt("Enter your name:");
    localStorage.setItem(name, score);
}

function displayHighScores() {
    let highScores = document.getElementById("high-scores");
    highScores.innerHTML = "";
    let scores = [];
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        scores.push({ name: key, score: value });
    }

    scores.sort((a, b) => {
        return b.score - a.score;
    });

    for (let i = 0; i < 3; i++) {
        let li = document.createElement("li");
        li.innerHTML = `${scores[i].name} - ${scores[i].score}`;
        highScores.appendChild(li);
    }
}

let highScores = document.getElementById("high-scores");
for (let i = 0; i < 3; i++) {
    let score = scores[i];
    let p = document.createElement("p");
    p.innerHTML = `${score.name} : ${score.value}`;
    highScores.appendChild(p);
}