// select elements using dom querySelector
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

// app  data - object
const weather = {};

weather.temperature = {
    unit: "celsius"
}
// const variable for temp conversion
const KELVIN = 273;
//API KEY FROM OPENWEATHERMAP.org - change key later
const key = "82005d27a116c2880c8f0fcb866998a0";

//geolocation checking
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.getElementsByClassName.display = "block";
    notificationElement.innerHTML = "<p>Your browser doesn't support Geolocation</p>";
}
//set user position
function setPosition(position) {
    let latitude = position.coords.latitude;
    let longtitude = position.coords.longtitude;

    getWeather(latitude, longtitude);
}

//show error if service problem
function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`
}
function getWeather(latitude, longtitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=${key}`;

    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
    .then(function(data){
        weather.temperature.value = math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    })
    .then(function() {
        displayWeather();
    });
}
function displayWeather() {
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}
function celsiusToFahrenheit(temperature) {
    return (temperature * 9/5) +32;
}
tempElement.addEventListener("click", function() {
    if(weather.temperature.value === undefined) return;

    if(weather.temperature.unit =="celsius") {
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        tempElement.innerHTML = `${fahrenheit}<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else {
        tempElement.innerHTML = `${weather.temperature.value}°</span>`;
        weather.temperature.uinit = "celsius"
    }
});
