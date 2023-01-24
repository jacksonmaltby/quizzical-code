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

let timeLeft = 120;
let score = 0;
let currentQuestion = 0;

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
    showQuestion();
    countdown();
}

function showQuestion() {
    if (currentQuestion === quiz.length) {
        showResults();
        return;
    }
    const question = quiz[currentQuestion];
    form.innerHTML = `
      <h2>${question.question}</h2>
      ${question.options.map((option, index) => `<button class="option" name="answer" value="${option}">${option}</button>`).join("")}
      <br>
      <div id="message"></div>
      <br>
      <span id="timer"></span>
    `;
}

function countdown() {
    const timer = document.getElementById("timer");
    const interval = setInterval(() => {
        timeLeft--;
        timer.innerHTML = `Time left: ${timeLeft} seconds`;
        if (timeLeft === 0) {
            clearInterval(interval);
            showResults();
        }
    }, 1000);
}

function checkAnswer(e) {
    e.preventDefault();
    const selectedOption = document.querySelector('.option:checked');
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
}