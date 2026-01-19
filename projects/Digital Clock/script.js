function clock(){
    const now = new Date();
    let hours = now.getHours().toString();
    const meridiem = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; 
    hours = hours.toString().padStart(2, 0);
    const minute = now.getMinutes().toString().padStart(2, 0);
    const seconds = now.getSeconds().toString().padStart(2, 0);

    const timeString = `${hours}:${minute}:${seconds} ${meridiem}`;
    document.getElementById("clock").textContent = timeString;
}

setInterval(clock, 100);