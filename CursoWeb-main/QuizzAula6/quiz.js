const questions = [
    {
        question: "Qual é a capital da França?",
        answer: [
            { option: "Paris", correct: true },
            { option: "Londres", correct: false },
            { option: "Berlim", correct: false },
        ],
    },
    {
        question: "Quem escreveu Dom Casmurro?",
        answer: [
            { option: "Machado de Assis", correct: true },
            { option: "José de Alencar", correct: false },
            { option: "Clarice Lispector", correct: false },
        ],
    },
    {
        question: "Qual é a capital da Itália?",
        answer: [
            { option: "Roma", correct: true },
            { option: "Milão", correct: false },
            { option: "Nápolis", correct: false },
        ],
    },
    {
        question: "Quem pintou Mona Lisa?",
        answer: [
            { option: "Leonardo da Vinci", correct: true },
            { option: "Michelangelo", correct: false },
            { option: "Raphael", correct: false },
        ],
    },
    {
        question: "Qual é a fórmula química da água?",
        answer: [
            { option: "CO2", correct: false },
            { option: "O2", correct: false },
            { option: "H2O", correct: true }, // Corrigido: H2O é a fórmula da água
        ],
    }
];

let indiceAtual = 0;
let pontuacao = 0;

const perguntaEl = document.getElementById("pergunta");
const opcoesEl = document.getElementById("opcoes");
const btnProximo = document.getElementById("btn-proximo");
const resultadoEl = document.getElementById("resultado");

function carregarPergunta() {
    btnProximo.style.display = "none";
    const q = questions[indiceAtual];
    perguntaEl.textContent = q.question;
    opcoesEl.innerHTML = "";

    q.answer.forEach((opcao, index) => {
        const btn = document.createElement("button");
        btn.textContent = opcao.option;
        btn.onclick = () => verificarResposta(opcao.correct, btn);
        opcoesEl.appendChild(btn);
    });
}

function verificarResposta(correto, botaoClicado) {
    const botoes = opcoesEl.querySelectorAll("button");

    botoes.forEach((btn) => {
        btn.disabled = true;
        const isCorreta = questions[indiceAtual].answer.find(a => a.option === btn.textContent).correct;
        btn.style.backgroundColor = isCorreta ? "#28a745" : "#dc3545";
    });

    if (correto) {
        pontuacao++;
    }

    btnProximo.style.display = "inline-block";
}

btnProximo.onclick = () => {
    indiceAtual++;
    if (indiceAtual < questions.length) {
        carregarPergunta();
    } else {
        mostrarResultado();
    }
};

function mostrarResultado() {
    perguntaEl.textContent = "";
    opcoesEl.innerHTML = "";
    btnProximo.style.display = "none";
    resultadoEl.innerHTML = `Você acertou <strong>${pontuacao}</strong> de ${questions.length} perguntas.`;
}

// Inicializa o quiz
carregarPergunta();