const questions = [
  {
    question: "Qual é o maior animal do mundo?",
    answers: [
      { id: 1, text: "Tubarão", correct: false },
      { id: 2, text: "Baleia Azul", correct: true },
      { id: 3, text: "Elefante", correct: false },
      { id: 4, text: "Girafa", correct: false },
    ],
  },
  {
    question: "Qual é o maior planeta do sistema solar?",
    answers: [
      { id: 1, text: "Terra", correct: false },
      { id: 2, text: "Marte", correct: false },
      { id: 3, text: "Júpiter", correct: true },
      { id: 4, text: "Saturno", correct: false },
    ],
  },
  {
    question: "Qual é a capital da Alemanha?",
    answers: [
      { id: 1, text: "Berlim", correct: true },
      { id: 2, text: "Munique", correct: false },
      { id: 3, text: "Frankfurt", correct: false },
      { id: 4, text: "Hamburgo", correct: false },
    ],
  },
  {
    question: "Qual é o maior deserto do mundo?",
    answers: [
      { id: 1, text: "Kalahari", correct: false },
      { id: 2, text: "Gobi", correct: false },
      { id: 3, text: "Saara", correct: true },
      { id: 4, text: "Antartica", correct: false },
    ],
  },
  {
    question: "Qual é o menor continente do mundo?",
    answers: [
      { id: 1, text: "Asia", correct: false },
      { id: 2, text: "Austrália", correct: true },
      { id: 3, text: "Ártico", correct: false },
      { id: 4, text: "Áfria", correct: false },
    ],
  },
  {
    question: "Qual é o menor país do mundo mundo?",
    answers: [
      { id: 1, text: "Vaticano", correct: true },
      { id: 2, text: "Butão", correct: false },
      { id: 3, text: "Nepal", correct: false },
      { id: 4, text: "Shri Lanka", correct: false },
    ],
  },
  {
    question: "Qual é o maior oceano do mundo?",
    answers: [
      { id: 1, text: "Atlântico", correct: false },
      { id: 2, text: "Índico", correct: false },
      { id: 3, text: "Ártico", correct: false },
      { id: 4, text: "Pacífico", correct: true },
    ],
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

function startTimer() {
  clearInterval(timer);
  timeLeft = 30;
  timerElement.textContent = `Tempo restante: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Tempo restante: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      timeoutAnswer();
    }
  }, 1000);
}

function timeoutAnswer() {
  // Quando o tempo acabar: desabilitar botões e mostrar a resposta correta
  const answers = questions[currentQuestionIndex].answers;
  const correctAnswer = answers.find(answer => answer.correct === true);

  Array.from(answerButtons.children).forEach(button => {
    button.disabled = true;
    if (button.dataset.id == correctAnswer.id) {
      button.classList.add("correct");
    }
  });

  nextButton.style.display = "block";
}

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Próxima";
  showQuestion();
}

function showQuestion() {
  resetState();
  startTimer();

  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    button.dataset.id = answer.id;
    answerButtons.appendChild(button);

    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
  clearInterval(timer);
  timerElement.textContent = '';
}

function selectAnswer(e) {
  clearInterval(timer);

  const answers = questions[currentQuestionIndex].answers;
  const correctAnswer = answers.find(answer => answer.correct === true);
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.id == correctAnswer.id;

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach(button => {
    button.disabled = true;
    if (button.dataset.id == correctAnswer.id) {
      button.classList.add("correct");
    }
  });

  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  timerElement.textContent = "";
  questionElement.innerHTML = `Você acertou ${score} de ${questions.length}!`;
  nextButton.innerHTML = "Jogar novamente";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
