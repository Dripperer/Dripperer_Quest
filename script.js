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
let hasAnswered = false;

// Aggiungi eventi per il login, il menu e altre azioni
document.getElementById('menuButton').onclick = toggleMenu;
document.getElementById('loginSubmit').onclick = login;
document.getElementById('registerSubmit').onclick = register;
document.getElementById('homeBtn').onclick = showHome;
document.getElementById('leaderboardBtn').onclick = showLeaderboard;
document.getElementById('backBtn').onclick = showHome;
document.getElementById('logoutBtn').onclick = logout;
document.getElementById('backToHomeBtn').onclick = showHome;

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

startCountdown();

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
        alert("Credenziali errate.");
    }
}

function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!localStorage.getItem(username)) {
        localStorage.setItem(username, password);
        currentUser = username;
        showHome();
    } else {
        alert("Nome utente già esistente.");
    }
}

function showHome() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('home').style.display = 'block';
    document.getElementById('menuButton').style.display = 'block';
}

function showLeaderboard() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('leaderboard').style.display = 'block';
}

function logout() {
    currentUser = null;
    document.getElementById('home').style.display = 'none';
    document.getElementById('login').style.display = 'block';
    document.getElementById('menuButton').style.display = 'none';
}