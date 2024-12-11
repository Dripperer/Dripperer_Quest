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

document.getElementById('menuButton').onclick = toggleMenu;
document.getElementById('loginSubmit').onclick = login;
document.getElementById('registerSubmit').onclick = register;
document.getElementById('submitVideos').onclick = submitVideos;
document.getElementById('homeBtn').onclick = showHome;
document.getElementById('leaderboardBtn').onclick = showLeaderboard;

function toggleMenu() {
    const menuContent = document.getElementById('menuContent');
    menuContent.style.display = (menuContent.style.display === 'block') ? 'none' : 'block';
}

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

function showHome() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('leaderboard').style.display = 'none';
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

function showQuestion(index) {
    const question = questions[index];
    const questionPage = document.createElement('div');
    questionPage.innerHTML = `<h2>${question.question}</h2>`;
    
    question.options.forEach(option => {
        const optionButton = document.createElement('button');
        optionButton.innerText = option;
        optionButton.onclick = () => checkAnswer(option, question.answer, index);
        questionPage.appendChild(optionButton);
    });

    document.getElementById('home').innerHTML = '';
    document.getElementById('home').appendChild(questionPage);
}

function checkAnswer(selectedAnswer, correctAnswer, questionIndex) {
    if (selectedAnswer === correctAnswer) {
        score += 10;
        alert('Risposta corretta!');
    } else {
        alert(`Risposta sbagliata! La risposta corretta era: ${correctAnswer}`);
    }
    if (questionIndex + 1 < questions.length) {
        showHome();  // Passa alla prossima domanda
    } else {
        alert('Hai completato tutte le domande!');
    }
}

function submitVideos() {
    const videoInput = document.getElementById('videoLinks').value;
    const videos = videoInput.split(',').map(link => link.trim()).slice(0, 5);

    videoLinks = videoLinks.concat(videos);
    score += videos.length * 5;
    alert(`Hai inviato ${videos.length} video! Hai guadagnato ${videos.length * 5} punti.`);
}

function showLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

    leaderboard.push({ user: currentUser, score: score });
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

    const leaderboardList = document.getElementById('leaderboardList');
    leaderboardList.innerHTML = leaderboard.map((entry, index) => `<p>${index + 1}. ${entry.user} - ${entry.score} punti</p>`).join('');
    
    document.getElementById('home').style.display = 'none';
    document.getElementById('leaderboard').style.display = 'block';
}
