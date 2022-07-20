// Display city location and weather info 
function displayCityOverview(cityName, weather) {
    const todayDay = new Date ()
    const title = document.getElementById("overview-title")
    title.innerHTML = `${cityName} (${todayDay.toDateString()})`; 
    const temperatureElement = document.getElementById("Temp")
    temperatureElement.innerHTML = `Temp: ${weather.current.temp} &degF` 
    const windElement = document.getElementById("Wind")
    windElement.innerHTML = `Wind: ${weather.current.wind_speed} MPH`
    const humidityElement = document.getElementById("Humidity")
    humidityElement.innerHTML = `Humidity: ${weather.current.humidity} %`
    const ultraElement = document.getElementById('UV-Index')
    ultraElement.innerHTML = `UV-Index: ${weather.current.uvi}`
    }
    









// Search Button
async function handleSearch() {
    const userInput = document.getElementById("searchInput").value
    const cityLocation = await cityLongandLat(userInput)
    const weather = await weatherDate(cityLocation.longitude, cityLocation.latitude)
    displayCityOverview(cityLocation.name, weather)
    displayFiveDayForecast(weather)
}

// City Buttons
const cityButtons = document.getElementsByClassName('city')

for (var i = 0; i < cityButtons.length; i++){
    let btn = cityButtons.item(i)
    btn.addEventListener("click", function(){
        document.getElementById("searchInput").value = btn.innerHTML
        handleSearch();
    
    })
}



async function cityLongandLat(city) {
    const weatherURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=722979637d7f44411802fb9c1783e210`
    const response = await fetch(weatherURL).then(response => response.json())
    const infoCity = response[0] 
    const data = { longitude: infoCity.lon, latitude: infoCity.lat, name: infoCity.name, state: infoCity.state, country: infoCity.country }
    return data
}

// Five Day Forecast 
function displayFiveDayForecast(weather){
const forecastCards = document.getElementById("forecast").children

for (let i = 0; i < 5; i ++){

const forecast = weather.daily[i + 1]
const date = new Date(forecast.dt * 1000)

const cards = forecastCards.item(i).children
cards.item(0).innerHTML = date.toDateString()
cards.item(1).src = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`
cards.item(2).innerHTML = `Temp: ${forecast.temp.day} &degF`
cards.item(3).innerHTML = `Wind: ${forecast.wind_speed} MPH`
cards.item(4).innerHTML = `Humidity: ${forecast.humidity} %`
}}

// Declaring Variables 
const searchbutton = document.getElementById('searchbutton')
searchbutton.addEventListener("click", handleSearch)


// Weather API 
async function weatherDate(longitude, latitude) {
    const apiweatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=722979637d7f44411802fb9c1783e210&units=imperial`;
    const data = await fetch(apiweatherUrl).then(response => response.json())
    return data
}

cityButtons.addEventListener("click")