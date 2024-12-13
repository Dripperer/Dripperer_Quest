const questions = [
    { question: "In quale anno è stata creata la band Dripperer?", options: ["2022", "2021", "2023", "2020"], answer: "2023" },
    { question: "Qual è il nome del primo album della band?", options: ["Smile", "Reverie", "No Sleep", "Electric Souls"], answer: "Smile" },
    { question: "Qual è la prima canzone pubblicata dalla band?", options: ["Drip & Chill Chill", "No Sleep", "Melodies of Drip", "Electric Vibes"], answer: "Drip & Chill Chill" },
    { question: "Chi è il chitarrista della band?", options: ["Andrea", "Sebasthian", "Ilaria", "Lorelayne"], answer: "Ilaria" },
    { question: "Chi è il batterista della band?", options: ["Andrea", "Sebasthian", "Lorelayne", "Ilaria"], answer: "Sebasthian" },
    { question: "Chi suona il piano nella band?", options: ["Andrea", "Sebasthian", "Lorelayne", "Ilaria"], answer: "Lorelayne" },
    { question: "Chi è il membro che suona l'ukulele?", options: ["Sebasthian", "Lorelayne", "Andrea", "Ilaria"], answer: "Andrea" },
    { question: "Qual era il nome iniziale della band prima di diventare Dripperer?", options: ["Drip & Chill", "BEATZ", "The Jammers", "Chill Vibes"], answer: "BEATZ" },
    { question: "Quanti membri aveva la band all'inizio?", options: ["4", "6", "5", "3"], answer: "5" },
    { question: "Chi ha cambiato il nome della band da BEATZ a Dripperer?", options: ["Ilaria", "Andrea", "Lorelayne", "Sebasthian"], answer: "Tutti insieme" }
];

let currentUser = null;
let score = 0;
let questionAnswered = new Array(questions.length).fill(false); // Array per tracciare se ogni domanda è stata già risposta

// Funzione per visualizzare la pagina Home
function showHome() {
    document.getElementById('home').style.display = 'block';
    document.getElementById('login').style.display = 'none';
    document.getElementById('leaderboard').style.display = 'none';
    document.getElementById('menuContent').style.display = 'none';
    
    // Aggiungi le domande
    let questionsHTML = '';
    questions.forEach((q, index) => {
        questionsHTML += `
            <div class="question">
                <h3>${q.question}</h3>
                ${q.options.map((option, i) => `<button onclick="checkAnswer('${q.answer}', '${option}', ${index})" id="btn-${index}-${i}">${option}</button>`).join('')}
            </div>
        `;
    });
    document.getElementById('questionsList').innerHTML = questionsHTML;
    startCountdown();
}

// Funzione di controllo della risposta
function checkAnswer(correctAnswer, selectedAnswer, questionIndex) {
    if (questionAnswered[questionIndex]) return; // Se la domanda è già stata risolta, non fare nulla

    // Disabilita i pulsanti per quella domanda
    const buttons = document.querySelectorAll(`#btn-${questionIndex}`);
    buttons.forEach(button => button.disabled = true);

    // Verifica la risposta
    if (correctAnswer === selectedAnswer) {
        alert('Risposta corretta!');
        score++;
    } else {
        alert('Risposta sbagliata!');
    }

    questionAnswered[questionIndex] = true; // Segna che la domanda è stata risolta
}

// Funzione per il login
document.getElementById('loginSubmit').onclick = function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (localStorage.getItem(username) === password) {
        currentUser = username;
        showHome(); // Vai alla home dopo il login
    } else {
        alert('Credenziali errate');
    }
};

// Funzione per la registrazione
document.getElementById('registerSubmit').onclick = function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    localStorage.setItem(username, password);
    currentUser = username;
    showHome(); // Vai alla home dopo la registrazione
};

// Funzione per il menu laterale
document.getElementById('menuButton').onclick = function() {
    const menuContent = document.getElementById('menuContent');
    menuContent.classList.toggle('active');
};

// Funzione per il logout
document.getElementById('logoutBtn').onclick = function() {
    currentUser = null;
    showLogin(); // Torna al login
};

// Funzione per il countdown (già definita in precedenza)
function startCountdown() {
    const endDate = new Date(localStorage.getItem('weekEndDate') || new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
    localStorage.setItem('weekEndDate', endDate);

    function updateCountdown() {
        const now = new Date();
        const timeLeft = endDate - now;

        if (timeLeft <= 0) {
            document.getElementById('countdown').innerText = "Tempo Scaduto!";
            localStorage.removeItem('leaderboard');
        } else {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            document.getElementById('countdown').innerText = `Tempo rimasto: ${days}g ${hours}h ${minutes}m ${seconds}s`;
        }
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();
}
