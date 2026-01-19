const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");

function Stopwatch(){
    let isRunning = false;

    let miliseconds = 0;
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    
    const startWatch = () => {
        if(isRunning) return;
        isRunning = true;

        const run = () => {
            miliseconds++;
            if(miliseconds>=100){
                seconds++;
                miliseconds = 0;
            }
            if(seconds>=60){
                minutes++;
                seconds = 0;
            }
            if(minutes>=60){
                hours++;
                minutes = 0;
            }
            display()
        }

        return intervalId = setInterval(run, 10);
    }

    const stopWatch = () => {
        if(!isRunning) return
        isRunning = false;
        
        clearInterval(intervalId);
    }

    const reset = () => {
        stopWatch();

        miliseconds = 0;
        seconds = 0;
        minutes = 0;
        hours = 0;
        
        display()
    }

    const display = () => {
        miliseconds = miliseconds.toString().padStart(2, 0);
        seconds = seconds.toString().padStart(2, 0);
        minutes = minutes.toString().padStart(2, 0);
        hours = hours.toString().padStart(2, 0);
        
        const timeString = `${hours}:${minutes}:${seconds}:${miliseconds}`
        document.getElementById("time").textContent = timeString;
    }

    return {startWatch, stopWatch, reset}
}
const stopwatch = new Stopwatch();

start.addEventListener("click", () => stopwatch.startWatch());
stop.addEventListener("click", () => stopwatch.stopWatch());
reset.addEventListener("click", () => stopwatch.reset());
