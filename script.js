const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('startButton');
const resetTaskButton = document.getElementById('resetTaskButton'); 
const resetBreakButton = document.getElementById('resetBreakButton');
const headerTask = document.getElementById('headerTask');
const inputTask = document.getElementById('inputTask');
const quoteDisplay = document.getElementById('quoteDisplay');
const musicSelect = document.getElementById('musicSelect');
const breakMusic = document.getElementById('breakMusic');

let timeLeft = 25 * 60;
let timer;
let isTimerRunning = false;
let isTaskTime = true;
let quoteInterval;
inputTask.value = "";

const quotes = [
    "Believe you can and you're halfway there. – Theodore Roosevelt",
    "The future depends on what you do today. – Mahatma Gandhi",
    "Don’t watch the clock; do what it does. Keep going. – Sam Levenson",
    "The secret of getting ahead is getting started. – Mark Twain",
    "Success is the sum of small efforts repeated day in and day out. – Robert Collier",
    "Hard work beats talent when talent doesn’t work hard. – Tim Notke",
];

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

function quoteRotation() {
    clearInterval(quoteInterval); 
    quoteDisplay.textContent = getRandomQuote(); 
    quoteInterval = setInterval(() => {
        quoteDisplay.textContent = getRandomQuote();
    }, 6000); 
}

function playBreakMusic() {
    const selectedMusic = musicSelect.value;
    breakMusic.src = selectedMusic;
    breakMusic.style.display = "block";
    breakMusic.play();
}

function stopBreakMusic() {
    breakMusic.pause();
    breakMusic.currentTime = 0; 
    breakMusic.style.display = "none";
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function updateTimer() {
    timerDisplay.textContent = formatTime(timeLeft);
}

startButton.addEventListener('click', () => {
    const task = inputTask.value.trim();
    if (task && isTaskTime) {
        headerTask.textContent = task;
        inputTask.style.display = "none";
    } else if (isTaskTime && !task) {
        alert("Please enter the task");
        return;
    }
    if (isTimerRunning) {
        clearInterval(timer);
        startButton.textContent = "Start";
    } else {
        timer = setInterval(() => {
            timeLeft--;
            updateTimer();

            if (isTaskTime && timeLeft <= 0) {
                clearInterval(timer);
                alert("Pomodoro completed! Take a break.");
                timeLeft = 5 * 60;
                updateTimer();
                quoteRotation();
                headerTask.style.display="none";
                startButton.textContent = "Start";
                playBreakMusic();
                isTaskTime = false;
            } else if (!isTaskTime && timeLeft <= 0) {
                clearInterval(timer);
                alert("Break completed! Back to work.");
                timeLeft = 25 * 60;
                updateTimer();
                headerTask.textContent = task;
                startButton.textContent = "Start";
                isTaskTime = true;
                stopBreakMusic();
            }
        }, 1000);
        startButton.textContent = "Pause";
    }
    isTimerRunning = !isTimerRunning;
});

resetTaskButton.addEventListener('click', () => {
    clearInterval(timer);
    timeLeft = 25 * 60;
    updateTimer();
    inputTask.value = "";
    inputTask.style.display = "block";
    startButton.textContent = "Start";
    stopBreakMusic();
    isTimerRunning = false;
    isTaskTime = true;
});

resetBreakButton.addEventListener('click', () => {
    clearInterval(timer);
    stopBreakMusic(); 
    timeLeft = 5 * 60;
    updateTimer();
    quoteRotation();
    headerTask.style.display="none";
    inputTask.style.display = "none";
    startButton.textContent = "start";
    playBreakMusic();
    isTimerRunning = false;
    isTaskTime = false;
});

 
updateTimer(); 
