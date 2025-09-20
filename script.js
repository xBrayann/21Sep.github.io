const answers = document.querySelectorAll(".answer-btn");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next-question");
const resetBtn = document.getElementById("reset-game");
const cardsContainer = document.getElementById("cards-container");
const cardTemplate = document.getElementById("card-template");

const questions = [
    { 
        text: "¿En donde nos conocimos y cuando fue?",
        options: [
            { text: "", correct: false },
            { text: "", correct: true },
            { text: "", correct: false }
        ]
    },
    {
        text: "¿?",
        options: [
            { text: "14 de febrero", correct: false },
            { text: "21 de septiembre", correct: true },
            { text: "31 de diciembre", correct: false }
        ]
    },
    {
        text: "¿Qué color suele representar el amor?",
        options: [
            { text: "Verde", correct: false },
            { text: "Rojo", correct: true },
            { text: "Azul", correct: false }
        ]
    }
];

let currentQuestion = 0;
let questionAnswered = false;

function loadQuestion(index) {
    const q = questions[index];
    document.getElementById("question-text").textContent = q.text;

    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";

    q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt.text;
    btn.classList.add("answer-btn");
    btn.dataset.correct = opt.correct;
    btn.addEventListener("click", checkAnswer);
    answersDiv.appendChild(btn);
    });

    feedback.textContent = "";
    nextBtn.disabled = true;
    questionAnswered = false;
}

// ===== Revisar respuesta =====
function checkAnswer(e) {
    if (questionAnswered) return;
    questionAnswered = true;

    const isCorrect = e.target.dataset.correct === "true";
    if (isCorrect) {
        feedback.textContent = "✅ ¡Correcto! Has desbloqueado una carta.";
        addCard();
    } else {
        feedback.textContent = "❌ Respuesta incorrecta. Inténtalo en la siguiente.";
    }
    nextBtn.disabled = false;
}

// ===== Agregar una carta =====
function addCard() {
    const cardClone = cardTemplate.content.cloneNode(true);
    const cardElement = cardClone.querySelector(".card");

  // Evento para abrir la carta
    cardElement.addEventListener("click", () => {
        cardElement.classList.toggle("open");
    });

  // Botón para cerrar dentro de la carta
    const closeBtn = cardClone.querySelector(".close-card");
    closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        cardElement.classList.remove("open");
    });

    cardsContainer.appendChild(cardElement);
}

nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion(currentQuestion);
    } else {
        feedback.textContent = "🎉 ¡Has respondido todas las preguntas!";
        nextBtn.disabled = true;
    }
});

resetBtn.addEventListener("click", () => {
    currentQuestion = 0;
    cardsContainer.innerHTML = "";
    loadQuestion(currentQuestion);
});


loadQuestion(currentQuestion);
