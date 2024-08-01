document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const startBtn = document.getElementById('startBtn');
    const lapBtn = document.getElementById('lapBtn');
    const stopBtn = document.getElementById('stopBtn');
    const resetBtn = document.getElementById('resetBtn');
    const lapsContainer = document.getElementById('laps');

    let startTime;
    let updatedTime;
    let difference;
    let tInterval;
    let running = false;
    let lapNumber = 0;

    function startTimer() {
        if (!running) {
            startTime = new Date().getTime();
            tInterval = setInterval(getShowTime, 1);
            running = true;
            startBtn.textContent = 'Pause';
        } else {
            clearInterval(tInterval);
            running = false;
            startBtn.textContent = 'Start';
        }
    }

    function getShowTime() {
        updatedTime = new Date().getTime();
        difference = updatedTime - startTime;

        let milliseconds = Math.floor((difference % 1000) / 10);
        let seconds = Math.floor((difference / 1000) % 60);
        let minutes = Math.floor((difference / (1000 * 60)) % 60);

        milliseconds = milliseconds < 10 ? '0' + milliseconds : milliseconds;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        display.innerHTML = `${minutes}:${seconds}:${milliseconds}`;
    }

    function recordLap() {
        if (running) {
            lapNumber++;
            const lapTime = document.createElement('div');
            lapTime.textContent = `Lap ${lapNumber}: ${display.textContent}`;
            lapsContainer.appendChild(lapTime);
        }
    }

    function stopTimer() {
        clearInterval(tInterval);
        running = false;
        startBtn.textContent = 'Start';
    }

    function resetTimer() {
        clearInterval(tInterval);
        running = false;
        display.innerHTML = '00:00:00';
        lapsContainer.innerHTML = '';
        startBtn.textContent = 'Start';
        lapNumber = 0;
    }

    startBtn.addEventListener('click', startTimer);
    lapBtn.addEventListener('click', recordLap);
    stopBtn.addEventListener('click', stopTimer);
    resetBtn.addEventListener('click', resetTimer);
});
