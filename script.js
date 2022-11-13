var userInput = document.getElementById("user-input");
var userForm = document.getElementById("form-submit");
var searchedCities = [];
var cityName = document.getElementById("city-name");

var weatherAPI = "https://api.openweathermap.org/data/2.5/forecast?";
var geocoderAPI = "http://api.openweathermap.org/geo/1.0/direct?q=";
var APIkey = "appid=272572527f0f24c6a9098fc55c892b6c";

//Functions
// On city search
function handleFormSubmit(e) {
  e.preventDefault();
  var input = userInput.value;
  getCoords(input);
}

// Get coordinates for weather API
function getCoords(city) {
  var geocoderCall = geocoderAPI + city + "&" + APIkey;
  fetch(geocoderCall)
    .then(function (responce) {
      return responce.json();
    })
    .then(function (data) {
      var lat = data[0].lat;
      var lon = data[0].lon;
      return getWeather(lat, lon);
    });
}

// Get weather from lat/lon
function getWeather(lat, lon) {
  var weatherCall =
    weatherAPI + "lat=" + lat + "&lon=" + lon + "&units=imperial&" + APIkey;
  fetch(weatherCall)
    .then(function (responce) {
      return responce.json();
    })
    .then(function (data) {
      console.log(data);
      return getData(data);
    });
}
// Take weather data
function getData(weather) {
  // Find weather
  var city = weather.city.name;
  var date = weather.list[0].dt_txt;
  var currentWeather = weather.list[0].weather[0].main;
  var temp = weather.list[0].main.temp;
  var wind = weather.list[0].wind.speed;
  var humidity = weather.list[0].main.humidity;
  // Change weather to an icon
  if (currentWeather === "Clouds") {
    var weatherIcon = "☁️";
  } else if (currentWeather === "Clear") {
    var weatherIcon = "☀️";
  } else if (currentWeather === "Snow") {
    var weatherIcon = "❄️";
  } else if (currentWeather === "Rain") {
    var weatherIcon = "🌧️";
  }
  // Send data for today's element
  makeToday(city, date, weatherIcon, temp, wind, humidity);
}

// Append to main block
function makeToday(city, date, weatherIcon, temp, wind, humidity) {
  var today = new Date();
  var todayTemp = document.createElement("h4");
  var todayWind = document.createElement("h4");
  var todayHumidity = document.createElement("h4");
  document.getElementById("city-name").textContent =
    city + " " + weatherIcon + " " + today;
  todayTemp.textContent = "Temp: " + temp + "°F";
  todayWind.textContent = "Wind: " + wind + "mph";
  todayHumidity.textContent = "Humidity: " + humidity + "%";
  document
    .getElementById("weather-data")
    .append(todayTemp, todayWind, todayHumidity);
}

// Event Listeners
userForm.addEventListener("submit", handleFormSubmit);

//Weather types from API
// Clouds/04d ☁️, Clear/01d ☀️, Snow/13d ❄️, Rain/10n 🌧️
