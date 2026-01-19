const card = document.querySelector(".card");
const weatherForm = document.getElementById("weatherForm");

weatherForm.addEventListener("submit", async event => {
    card.classList.remove("errorDisplay");
    const cityInput = document.querySelector(".cityInput")

    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData)
        } catch (e){
            console.error(e)
            errorDisplay(e)
        }
    } else {
        card.style.display = "block"
        card.textContent = "Please Enter a City Name."
        card.classList.add("errorDisplay")
    }
    
})

const getWeatherData = async city => {
    const apiKey = "78c5c620cb454aa79a2eadd85ff71d69";

    const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const response = await fetch(APIUrl)
    
    if(!response.ok){
        throw new Error("Weather data could not be fetched")
    }
    
    return await response.json()
}

const displayWeatherInfo = data => {
    const {name: city, main: {temp, humidity}, weather: [{description, id}]} = data;
    
    card.style.display = "block"
    card.textContent = ""
    
    const cityName = document.createElement("h2");
    cityName.textContent = city

    const temperature = document.createElement("h2")
    const toCelsius = temp - 273.15;
    temperature.textContent = `${(toCelsius).toFixed(1)}°C`

    const getHumidity = document.createElement("small")
    getHumidity.textContent = `Humidity: ${humidity}%`;

    const descriptionDisplay = document.createElement("p")
    descriptionDisplay.textContent = description

    const emojiDisplay = document.createElement("p")
    emojiDisplay.textContent = getWeatherEmoji(id);
    emojiDisplay.classList.add("emoji")

    card.appendChild(cityName)
    card.appendChild(temperature)
    card.appendChild(getHumidity)
    card.appendChild(descriptionDisplay)
    card.appendChild(emojiDisplay)
}

const getWeatherEmoji = weatherId => {
    console.log(weatherId)
    switch(true){
        case(weatherId>=200 && weatherId < 300):
            return "⛈️"
        case(weatherId>=300 && weatherId < 400):
            return "🌧️"
        case(weatherId>=500 && weatherId < 600):
            return "🌧️"
        case(weatherId>=600 && weatherId < 700):
            return "🌨️"
        case(weatherId>=700 && weatherId < 800):
            return "🌫️"
        case(weatherId === 800):
            return "☀️"
        case(weatherId>= 801 && weatherId < 810):
            return "☁️"
        default:
            return "?";
    }
}

const errorDisplay = error => {
    console.error(error)
    card.textContent = ""
    card.style.display = "block"
    card.classList.add("errorDisplay")
    card.textContent = error.message
}