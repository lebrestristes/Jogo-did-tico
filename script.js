// ===== Dados do Quiz =====
const questions = [
    {
        question: "O que é uma cadeia alimentar?",
        options: [
            "Uma lista de comidas favoritas",
            "A sequência de quem come quem em um ecossistema",
            "O processo de evaporação da água",
            "Um tipo de planta"
        ],
        correct: 1,
        explanation: "Cadeia alimentar mostra a transferência de energia entre os seres vivos!"
    },
    {
        question: "Qual destes é um PRODUTOR na cadeia alimentar?",
        options: [
            "Leão",
            "Cogumelo",
            "Planta (como capim ou árvore)",
            "Gavião"
        ],
        correct: 2,
        explanation: "Plantas produzem seu próprio alimento pela fotossíntese. Elas são a base da cadeia!"
    },
    {
        question: "Os consumidores primários são:",
        options: [
            "Carnívoros que comem outros animais",
            "Herbívoros que se alimentam de plantas",
            "Fungos e bactérias",
            "Animais que voam"
        ],
        correct: 1,
        explanation: "Herbívoros (como coelhos e gafanhotos) comem plantas → consumidores primários."
    },
    {
        question: "Qual é a principal função dos DECOMPOSITORES?",
        options: [
            "Produzir oxigênio",
            "Caçar outros animais",
            "Reciclar matéria orgânica e devolver nutrientes ao solo",
            "Fazer fotossíntese"
        ],
        correct: 2,
        explanation: "Fungos e bactérias decompõem restos e devolvem nutrientes para a natureza!"
    },
    {
        question: "Observe a sequência: Capim → Gafanhoto → Sapo → Cobra. Quem é o consumidor secundário?",
        options: [
            "Capim",
            "Gafanhoto",
            "Sapo",
            "Cobra"
        ],
        correct: 2,
        explanation: "O sapo come o gafanhoto (consumidor primário), então é consumidor secundário."
    },
    {
        question: "As plantas realizam fotossíntese. O que elas produzem nesse processo?",
        options: [
            "Apenas água",
            "Glicose (alimento) e oxigênio",
            "Somente dióxido de carbono",
            "Proteínas animais"
        ],
        correct: 1,
        explanation: "Com luz, água e CO₂, as plantas produzem glicose e liberam oxigênio. Incrível!"
    },
    {
        question: "Em uma cadeia alimentar de lago: Algas → Camarão → Peixe → Garça. As algas são:",
        options: [
            "Consumidoras",
            "Produtoras",
            "Decompositoras",
            "Predadoras"
        ],
        correct: 1,
        explanation: "Algas fazem fotossíntese, então são produtoras!"
    },
    {
        question: "Se os gafanhotos desaparecerem de uma cadeia (Capim → Gafanhoto → Sapo), o que pode acontecer?",
        options: [
            "Os sapos terão mais comida",
            "Os sapos podem diminuir por falta de alimento",
            "O capim some",
            "Nada muda"
        ],
        correct: 1,
        explanation: "Sem gafanhotos, os sapos ficam sem comida e sua população pode reduzir."
    },
    {
        question: "Qual ser vivo é um exemplo típico de DECOMPOSITOR?",
        options: [
            "Árvore",
            "Leão",
            "Fungos e bactérias",
            "Abelha"
        ],
        correct: 2,
        explanation: "Fungos e bactérias decompõem matéria orgânica morta. Essenciais para o ecossistema!"
    },
    {
        question: "Por que a cadeia alimentar é importante para o equilíbrio da natureza?",
        options: [
            "Porque mostra quem é o animal mais forte",
            "Porque garante a transferência de energia e nutrientes entre os seres vivos",
            "Porque ensina os animais a caçar",
            "Porque deixa a floresta mais colorida"
        ],
        correct: 1,
        explanation: "Ela mantém o fluxo de energia e nutrientes, mantendo o equilíbrio dos ecossistemas!"
    }
];

// ===== Estado do Jogo =====
let currentQuestion = 0;
let score = 0;
let answered = false;

// ===== Elementos do DOM =====
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');

const btnStart = document.getElementById('btn-start');
const btnNext = document.getElementById('btn-next');
const btnRestart = document.getElementById('btn-restart');

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const scoreDisplay = document.getElementById('score');
const questionCounter = document.getElementById('question-counter');
const progressFill = document.getElementById('progress-fill');
const feedback = document.getElementById('feedback');
const feedbackText = document.getElementById('feedback-text');

const finalScore = document.getElementById('final-score');
const endTitle = document.getElementById('end-title');
const endMessage = document.getElementById('end-message');
const endEmoji = document.getElementById('end-emoji');

// ===== Funções =====
function showScreen(screen) {
    startScreen.classList.remove('active');
    gameScreen.classList.remove('active');
    endScreen.classList.remove('active');
    screen.classList.add('active');
}

function startGame() {
    currentQuestion = 0;
    score = 0;
    answered = false;
    scoreDisplay.textContent = score;
    showScreen(gameScreen);
    loadQuestion();
}

function loadQuestion() {
    answered = false;
    feedback.classList.add('hidden');
    feedback.classList.remove('correct', 'wrong');

    const q = questions[currentQuestion];
    questionText.textContent = q.question;
    questionCounter.textContent = `${currentQuestion + 1} / ${questions.length}`;
    
    // Atualiza barra de progresso
    const progress = ((currentQuestion) / questions.length) * 100;
    progressFill.style.width = `${progress}%`;

    // Limpa e cria opções
    optionsContainer.innerHTML = '';
    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.textContent = option;
        btn.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(btn);
    });
}

function selectAnswer(selectedIndex) {
    if (answered) return;
    answered = true;

    const q = questions[currentQuestion];
    const buttons = optionsContainer.querySelectorAll('.option-btn');

    buttons.forEach((btn, index) => {
        btn.disabled = true;
        if (index === q.correct) {
            btn.classList.add('correct');
        } else if (index === selectedIndex) {
            btn.classList.add('wrong');
        }
    });

    if (selectedIndex === q.correct) {
        score++;
        scoreDisplay.textContent = score;
        feedbackText.textContent = `✅ Acertou! ${q.explanation}`;
        feedback.classList.add('correct');
    } else {
        feedbackText.textContent = `❌ Quase! ${q.explanation}`;
        feedback.classList.add('wrong');
    }

    feedback.classList.remove('hidden');

    // Se for a última pergunta, muda o texto do botão
    if (currentQuestion === questions.length - 1) {
        btnNext.textContent = 'Ver Resultado 🏆';
    } else {
        btnNext.textContent = 'Próxima →';
    }
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    // Atualiza progresso final
    progressFill.style.width = '100%';

    finalScore.textContent = `${score} / ${questions.length}`;

    if (score === 10) {
        endEmoji.textContent = '🏆';
        endTitle.textContent = 'Incrível!';
        endMessage.textContent = 'Você é um verdadeiro cientista da natureza! 10 de 10! Continue explorando o mundo!';
    } else if (score >= 7) {
        endEmoji.textContent = '🌟';
        endTitle.textContent = 'Muito bem!';
        endMessage.textContent = `Ótimo trabalho! Você acertou ${score} perguntas. Você já entende bem as cadeias alimentares!`;
    } else if (score >= 4) {
        endEmoji.textContent = '🌱';
        endTitle.textContent = 'Bom esforço!';
        endMessage.textContent = `Você acertou ${score} perguntas. Continue estudando e logo vai dominar o assunto!`;
    } else {
        endEmoji.textContent = '🍀';
        endTitle.textContent = 'Continue tentando!';
        endMessage.textContent = `Você acertou ${score} perguntas. Cada tentativa é um aprendizado. Jogue de novo!`;
    }

    showScreen(endScreen);
}

// ===== Eventos =====
btnStart.addEventListener('click', startGame);
btnNext.addEventListener('click', nextQuestion);
btnRestart.addEventListener('click', startGame);

// Inicia na tela inicial (já está ativa no HTML)
