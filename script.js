
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('startButton');
const resetTaskButton = document.getElementById('resetTaskButton'); 
const resetBreakButton = document.getElementById('resetBreakButton');
const headerTask = document.getElementById('headerTask');
const inputTask=document.getElementById('inputTask');

let timeLeft = 25 * 60; 
let timer;
let isTimerRunning = false;
let isTaskTime = true;
inputTask.value="";

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function updateTimer() {
    timerDisplay.textContent = formatTime(timeLeft);
}
startButton.addEventListener('click', () => {
    const task=inputTask.value.trim();
    if(task && isTaskTime){
        headerTask.textContent=task;
        inputTask.style.display="none";
    }
    else if(isTaskTime&&!task){
        alert("please enter th task");
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
                headerTask.textContent = "Break Time"; 
                startButton.textContent = "Start"; 
                isTaskTime = false; 
            } else if (!isTaskTime && timeLeft <= 0) {
                clearInterval(timer);
                alert("Break completed! Back to work.");
                timeLeft = 25 * 60; 
                updateTimer();
                headerTask.textContent = task; 
                startButton.textContent = "Start"; 
                isTaskTime = true; 
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
    headerTask.textContent = "enter your task"; 
    inputTask.value="";
    inputTask.style.display="block";
    startButton.textContent = "Start"; 
    isTimerRunning = false; 
    isTaskTime = true; 
});


resetBreakButton.addEventListener('click', () => {
    clearInterval(timer); 
    timeLeft = 5 * 60; 
    updateTimer();
    headerTask.textContent = "Break Time";
    inputTask.style.display="none"; 
    startButton.textContent = "Start";
    isTimerRunning = false; 
    isTaskTime = false; 
});


updateTimer();
