const minuteTime = document.getElementById('minute');
const secondTime = document.getElementById('second');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const upBtn_min = document.getElementById('up-min');
const upBtn_sec = document.getElementById('up-sec');
const downBtn_min = document.getElementById('down-min');
const downBtn_sec = document.getElementById('down-sec');

let timerInterval;
let totalSeconds = 0;
let isRunning = false;

let minTime = 0;
let secTime = 0;
const max = 59;
const min = 0;

function changeMin(direction) {
    if (direction === 'up') {
        minTime++;
        if (minTime > max) {
            minTime = min;
        }
    }
    else if (direction === 'down') {
        minTime--;
        if (minTime < min) {
            minTime = max;
        }
    }

    if (minTime < 10) {
        minuteTime.innerText = `0${minTime}`;
    }
    else if (minTime < 60) {
        minuteTime.innerText = minTime;
    }
}

function changeSec(direction) {
    if (direction === 'up') {
        secTime++;
        if (secTime > max) {
            secTime = min;
        }
    }
    else if (direction === 'down') {
        secTime--;
        if (secTime < min) {
            secTime = max;
        }
    }

    if (secTime < 10) {
        secondTime.innerText = `0${secTime}`;
    }
    else if (secTime < 60) {
        secondTime.innerText = secTime;
    }
}

function startTimer() {
    if (isRunning) {
        return;
    }

    totalSeconds = (minTime * 60) + secTime;

    if (totalSeconds <= 0) {
        return;
    }

    isRunning = true;
    startBtn.innerText = 'Running';

    upBtn_min.disabled = true;
    upBtn_sec.disabled = true;
    downBtn_min.disabled = true;
    downBtn_sec.disabled = true;

    timerInterval = setInterval(() => {
        totalSeconds--;

        minTime = Math.floor(totalSeconds / 60);
        secTime = totalSeconds % 60;
        
        if (minTime < 10) {
            minuteTime.innerText = `0${minTime}`;
        }
        else {
            minuteTime.innerText = minTime;
        }

        if (secTime < 10) {
            secondTime.innerText = `0${secTime}`;
        }
        else {
            secondTime.innerText = secTime;
        }

        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            isRunning = false;
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    startBtn.innerText = 'Start';
}

function resetTimer() {
    pauseTimer();
    minTime = 0;
    secTime = 0;
    minuteTime.innerText = '00';
    secondTime.innerText = '00';
    upBtn_min.disabled = false;
    upBtn_sec.disabled = false;
    downBtn_min.disabled = false;
    downBtn_sec.disabled = false;
}