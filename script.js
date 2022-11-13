// Variables
// For elements
var userInput = document.getElementById("user-input");
var userForm = document.getElementById("form-submit");
var searchedCities = [];
var cityName = document.getElementById("city-name");
// API shortcuts
var weatherAPI = "https://api.openweathermap.org/data/2.5/forecast?";
var geocoderAPI = "http://api.openweathermap.org/geo/1.0/direct?q=";
var APIkey = "appid=272572527f0f24c6a9098fc55c892b6c";
// DOM shortcuts
var todayTemp = document.createElement("h4");
var todayWind = document.createElement("h4");
var todayHumidity = document.createElement("h4");

var day1Date = document.createElement("h4");
var day1Weather = document.createElement("h5");
var day1Temp = document.createElement("h5");
var day1Wind = document.createElement("h5");
var day1Humidity = document.createElement("h5");
// For date
var objectDate = new Date();
var day = objectDate.getDate();
var month = objectDate.getMonth() + 1;
var year = objectDate.getFullYear();

//Functions
// On city search
function handleFormSubmit(e) {
  e.preventDefault();
  todayTemp.textContent = " ";
  todayWind.textContent = "";
  todayHumidity.textContent = "";
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
  makeToday(city, weatherIcon, temp, wind, humidity);

  // Find next 5 days
  for (let i = 0; i < weather.list.length; i++) {
    if (weather.list[i].dt_txt.includes("12:00:00")) {
      console.log(weather.list[i].dt_txt);
    }
  }
}

// Append to today block
function makeToday(city, weatherIcon, temp, wind, humidity) {
  var date = month + "/" + day + "/" + year;
  document.getElementById("city-name").textContent =
    city + " " + weatherIcon + " " + date;
  todayTemp.textContent = "Temp: " + temp + "°F";
  todayWind.textContent = "Wind: " + wind + "mph";
  todayHumidity.textContent = "Humidity: " + humidity + "%";
  document
    .getElementById("weather-data")
    .append(todayTemp, todayWind, todayHumidity);
}

// Append to next-day blocks
function makeDay1() {
  var date = month + "/" + (day + 1) + "/" + year;
}
function makeDay2() {
  var date = month + "/" + (day + 2) + "/" + year;
}
function makeDay1() {
  var date = month + "/" + (day + 3) + "/" + year;
}
function makeDay1() {
  var date = month + "/" + (day + 4) + "/" + year;
}
function makeDay1() {
  var date = month + "/" + (day + 5) + "/" + year;
}

// Event Listeners
userForm.addEventListener("submit", handleFormSubmit);

//Weather types from API
// Clouds/04d ☁️, Clear/01d ☀️, Snow/13d ❄️, Rain/10n 🌧️
