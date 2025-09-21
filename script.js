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
            { text: "31-Roblox", correct: false },
            { text: "23-Free Fire", correct: false },
            { text: "31-Free Fire", correct: true }
        ]
    },
    {
        text: "¿Cual es mi color favorito?",
        options: [
            { text: "Negro", correct: true },
            { text: "Azul", correct: false },
            { text: "Blanco y Negro", correct: false }
        ]
    },
    {
        text: "¿Quien le pedio que fuera el novio de quien y como?",
        options: [
            { text: "Tu me pediste que fuera tu novio mientras jugabamos", correct: false },
            { text: "Yo te pedi que fueramos novios mientras jugabamos", correct: false },
            { text: "Yo te pedi que fueramos novios en llamada", correct: true }
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

const cardMessages = [
    "Desde el primer momento que llegaste a mi vida, todo cambió para mejor. Tus sonrisas son la razón de mis días más felices y tus palabras mi refugio. Hoy quiero recordarte cuánto significas para mí. Eres mi regalo más bonito, y siempre lo serás. 💕",
    "Cada instante contigo se convierte en un recuerdo inolvidable. No importa si son días buenos o malos, siempre encuentro paz a tu lado. Eres mi amor, mi alegría y mi mejor compañía. Gracias por caminar conmigo en este viaje de amor. 🌹",
    "Si pudiera pedir un deseo, sería que nuestro amor dure para siempre. Porque contigo entendí que la felicidad está en los pequeños momentos. Un abrazo tuyo lo cura todo, y una mirada tuya lo dice todo. Hoy celebro tenerte, porque eres lo más valioso que tengo. ✨",
];

// Imágenes distintas para el flap
const flapImages = [
    "images/flores.png",
    "images/2.png",
    "images/3.png"
];

let cardIndex = 0;

function addCard() {
    const cardClone = cardTemplate.content.cloneNode(true);
    const cardElement = cardClone.querySelector(".card");

    // --- Texto dinámico dentro de la carta ---
    const cardText = cardClone.querySelector(".card-content p");
    cardText.textContent = cardMessages[cardIndex % cardMessages.length];

    // --- Imagen distinta para el flap ---
    const flapElement = cardClone.querySelector(".flap");
    flapElement.style.backgroundImage = `url(${flapImages[cardIndex % flapImages.length]})`;
    flapElement.style.backgroundSize = "cover";
    flapElement.style.backgroundPosition = "center";

    const inside = cardClone.querySelector(".card-inside");
    inside.hidden = true; 

-
    cardElement.addEventListener("click", () => {
        cardElement.classList.toggle("open");

        if (cardElement.classList.contains("open")) {
            inside.hidden = false;
        } else {
            inside.hidden = true;
        }
    });


    const closeBtn = cardClone.querySelector(".close-card");
    closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        cardElement.classList.remove("open");
        inside.hidden = true;
    });

    cardsContainer.appendChild(cardElement);
    cardIndex++;
}





nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion(currentQuestion);

        
        document.getElementById("headerxx").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    } else {
        feedback.textContent = "🎉 ¡Has respondido todas las preguntas!";
        nextBtn.disabled = true;

        document.getElementById("preguntas").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
});


resetBtn.addEventListener("click", () => {
    currentQuestion = 0;
    cardsContainer.innerHTML = "";
    loadQuestion(currentQuestion);
});


loadQuestion(currentQuestion);
