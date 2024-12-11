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
let videoLinks = [];

// Aggiungi eventi per il login e il menu
document.getElementById('menuButton').onclick = toggleMenu;
document.getElementById('loginSubmit').onclick = login;
document.getElementById('registerSubmit').onclick = register;
document.getElementById('submitVideos').onclick = submitVideos;
document.getElementById('homeBtn').onclick = showHome;
document.getElementById('leaderboardBtn').onclick = showLeaderboard;
document.getElementById('backBtn').onclick = showHome; // Aggiungi il ritorno alla home

// Funzione per il countdown settimanale
function startCountdown() {
    const endDate = new Date(localStorage.getItem('weekEndDate') || new Date().getTime() + 7 * 24 * 60 * 60 * 1000); // Imposta 7 giorni come scadenza
    localStorage.setItem('weekEndDate', endDate);

    function updateCountdown() {
        const now = new Date();
        const timeLeft = endDate - now;

        if (timeLeft <= 0) {
            document.getElementById('countdown').innerText = "Tempo Scaduto!";
            localStorage.removeItem('leaderboard');  // Reset della classifica dopo una settimana
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

startCountdown();

// Funzione per il menu
function toggleMenu() {
    const menuContent = document.getElementById('menuContent');
    menuContent.style.display = (menuContent.style.display === 'block') ? 'none' : 'block';
}

// Funzione di login
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (localStorage.getItem(username) === password) {
        currentUser = username;
        showHome();
    } else {
        alert("Credenziali errate!");
    }
}

// Funzione di registrazione
function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (!localStorage.getItem(username)) {
        localStorage.setItem(username, password);
        alert("Registrazione completata!");
        login();
    } else {
        alert("Username già esistente!");
    }
}

// Mostra la home dopo il login
function showHome() {
    if (!currentUser) {
        alert("Per favore, effettua il login prima di accedere alla Home.");
        return;
    }
    
    document.getElementById('login').style.display = 'none';
    document.getElementById('leaderboard').style.display = 'none';
    document.getElementById('questionPage').style.display = 'none';
    document.getElementById('home').style.display = 'block';
    
    const questionsList = document.getElementById('questionsList');
    questionsList.innerHTML = '';

    questions.forEach((q, index) => {
        const questionButton = document.createElement('button');
        questionButton.innerText = q.question;
        questionButton.onclick = () => showQuestion(index);
        questionsList.appendChild(questionButton);
    });
}

// Mostra la classifica solo se l'utente è loggato
function showLeaderboard() {
    if (!currentUser) {
        alert("Per favore, effettua il login per vedere la classifica.");
        return;
    }
    
    document.getElementById('login').style.display = 'none';
    document.getElementById('home').style.display = 'none';
    document.getElementById('questionPage').style.display = 'none';
    document.getElementById('leaderboard').style.display = 'block';
    
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    const leaderboardList = document.getElementById('leaderboardList');
    leaderboardList.innerHTML = leaderboard.map((entry, index) => `<p>${index + 1}. ${entry.user} - ${entry.score} punti</p>`).join('');
}

// Mostra la pagina della domanda con freccia per tornare
function showQuestion(index) {
    if (!currentUser) {
        alert("Per favore, effettua il login per rispondere alle domande.");
        return;
    }
    
    const question = questions[index];
    
    // Mostra il contenuto della domanda
    document.getElementById('home').style.display = 'none';
    document.getElementById('leaderboard').style.display = 'none';
    document.getElementById('questionPage').style.display = 'block';
    
    const questionContent = document.getElementById('questionContent');
    questionContent.innerHTML = `
        <h2>${question.question}</h2>
        ${question.options.map(option => 
            `<button onclick="checkAnswer('${option}', '${question.answer}')">${option}</button>`
        ).join('')}
    `;
}

// Verifica la risposta
function checkAnswer(selected, correct) {
    if (selected === correct) {
        score++;
        alert("Risposta corretta!");
    } else {
        alert("Risposta errata!");
    }
    
    // Torna alla home dopo la risposta
    showHome();
}

// Funzione per inviare video (opzionale)
function submitVideos() {
    const videoInput = document.getElementById('videoLinks');
    const links = videoInput.value.split(",").map(link => link.trim()).slice(0, 5); // Aggiungi un massimo di 5 link
    videoLinks = videoLinks.concat(links);
    alert(`Video inviati: ${links.join(', ')}`);
}
