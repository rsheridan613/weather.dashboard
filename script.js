var userInput = document.getElementById("user-input");
var userForm = document.getElementById("form-submit");
var searchedCities = [];
var today = document.getElementById("today");

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
  var temp = weather.list[0].main.temp;
  var wind = weather.list[0].wind.speed;
  var humidity = weather.list[0].main.humidity;
  console.log(city, temp, wind, humidity);
}
// Event Listeners
userForm.addEventListener("submit", handleFormSubmit);
