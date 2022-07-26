apiKey = 'cb2f88f51eb3c681f6de41b723de6fca'

async function cityLocation(city) {
const cityUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=cb2f88f51eb3c681f6de41b723de6fca`
apiResponse = await fetch(cityUrl).then(response=> response.json())
cityData = apiResponse[0]
wantedData = {latitude: cityData.lat, longitude: cityData.lon, name: cityData.name, state: cityData.state, country: cityData.country}
return wantedData
}
async function getWeather(latitude,longitude){
const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=cb2f88f51eb3c681f6de41b723de6fca&units=imperial`
const result = await fetch(weatherUrl).then(response=> response.json())
return result}

async function handleSearch(){
const input = document.getElementById('searchy').value
const cityLocal = await cityLocation(input)
const weather = await getWeather(cityLocal.latitude,cityLocal.longitude)
showCity(cityLocal.name, weather)
showFivedayWeather(weather)}

function showCity(cityName, weather){
const currentDay = new Date ()
const humiditybox = document.getElementById("humidity")
humiditybox.innerHTML = `The City's Humidity: ${weather.current.humidity} %`    
const overviewBox = document.getElementById("overview-title")
overviewBox.innerHTML = `${cityName} (${currentDay.toDateString()})`;
const uvBox = document.getElementById('uv-index')
uvBox.innerHTML = `The City's UV-Index: ${weather.current.uvi}` 
const temperatureBox = document.getElementById("temperature")
temperatureBox.innerHTML = `The City's Temperature: ${weather.current.temp} &degF` 
const windBox = document.getElementById("wind")
windBox.innerHTML = `The City's Wind Speed: ${weather.current.wind_speed} MPH`

}

function showFivedayWeather(weather){
const differentDays = document.getElementById("days").children
for (let i = 0; i < 5; i ++){
const days = weather.daily[i + 1]
const date = new Date(days.dt * 1000)
const uniqueDay = differentDays.item(i).children
uniqueDay.item(0).innerHTML = date.toDateString()
uniqueDay.item(1).src = `https://openweathermap.org/img/wn/${days.weather[0].icon}.png`
uniqueDay.item(2).innerHTML = `Temperature of the Day: ${days.temp.day} &degF`
uniqueDay.item(3).innerHTML = `Wind Speed of the Day: ${days.wind_speed} MPH`
uniqueDay.item(4).innerHTML = `Humidity of the Day: ${days.humidity} %`
}}
    
const searchBtn = document.getElementById('button')


searchBtn.addEventListener("click", handleSearch)
    

const citiesList = document.getElementsByClassName('citiesL')
for (var i = 0; i < citiesList.length; i++){
let Buttons = citiesList.item(i)
Buttons.addEventListener("click", function(){
document.getElementById("searchy").value = Buttons.innerHTML
handleSearch();
    })
}
cityBtns.addEventListener("click")