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
      return setPage(data);
    });
}
// Take weather data and set to page
function setPage(weather) {
  var city = weather.city.name;
  var weatherData = weather.list;
  var currentWeather = weatherData[0].weather[0].main;

  if (currentWeather === "Clouds") {
    weatherIcon = "☁️";
  } else if (currentWeather === "Clear") {
    weatherIcon = "☀️";
  } else if (currentWeather === "Snow") {
    weatherIcon = "❄️";
  } else if (currentWeather === "Rain") {
    weatherIcon = "🌧️";
  }

  var temp = weatherData[0].main.temp;
  var wind = weatherData[0].wind.speed;
  var humidity = weatherData[0].main.humidity;

  document.getElementById("city-name").textContent = city + " " + weatherIcon;
}

// Event Listeners
userForm.addEventListener("submit", handleFormSubmit);

//Weather types from API
// Clouds/04d ☁️, Clear/01d ☀️, Snow/13d ❄️, Rain/10n 🌧️
