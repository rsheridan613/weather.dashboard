// Variables
// For elements
var userInput = document.getElementById("user-input");
var userForm = document.getElementById("form-submit");
var cityName = document.getElementById("city-name");
var dayForecasts = document.getElementsByClassName("next-day");
// API shortcuts
var weatherAPI = "http://api.openweathermap.org/data/2.5/forecast?";
var geocoderAPI = "http://api.openweathermap.org/geo/1.0/direct?q=";
var APIkey = "appid=272572527f0f24c6a9098fc55c892b6c";
// DOM shortcuts
var todayTemp = document.createElement("h4");
var todayWind = document.createElement("h4");
var todayHumidity = document.createElement("h4");
// For date
var objectDate = new Date();
var day = objectDate.getDate();
var month = objectDate.getMonth() + 1;
var year = objectDate.getFullYear();
//For arrays
var searchedCities = [];
var nextDays = [];

//Functions
// On city search
function handleFormSubmit(e) {
  e.preventDefault();
  input = userInput.value;
  userForm.reset();
  // Send values
  getCoords(input);
  saveInput(input);
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
      // console.log(data);
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
      nextDays.push(weather.list[i]);
    }
  }
  // Send data to sort for next day's elements
  sortForecast(nextDays);
}

//Sort next day data
function sortForecast(nextDays) {
  var nextDay1Weather = nextDays[0].weather[0].main;
  var nextDay1Temp = nextDays[0].main.temp;
  var nextDay1Wind = nextDays[0].wind.speed;
  var nextDay1Humidity = nextDays[0].main.humidity;
  if (nextDay1Weather === "Clouds") {
    var day1Icon = "☁️";
  } else if (nextDay1Weather === "Clear") {
    var day1Icon = "☀️";
  } else if (nextDay1Weather === "Snow") {
    var day1Icon = "❄️";
  } else if (nextDay1Weather === "Rain") {
    var day1Icon = "🌧️";
  }
  makeDay1(day1Icon, nextDay1Temp, nextDay1Wind, nextDay1Humidity);

  var nextDay2Weather = nextDays[1].weather[0].main;
  var nextDay2Temp = nextDays[1].main.temp;
  var nextDay2Wind = nextDays[1].wind.speed;
  var nextDay2Humidity = nextDays[1].main.humidity;
  if (nextDay2Weather === "Clouds") {
    var day2Icon = "☁️";
  } else if (nextDay2Weather === "Clear") {
    var day2Icon = "☀️";
  } else if (nextDay2Weather === "Snow") {
    var day2Icon = "❄️";
  } else if (nextDay2Weather === "Rain") {
    var day2Icon = "🌧️";
  }
  makeDay2(day2Icon, nextDay2Temp, nextDay2Wind, nextDay2Humidity);

  var nextDay3Weather = nextDays[2].weather[0].main;
  var nextDay3Temp = nextDays[2].main.temp;
  var nextDay3Wind = nextDays[2].wind.speed;
  var nextDay3Humidity = nextDays[2].main.humidity;
  if (nextDay3Weather === "Clouds") {
    var day3Icon = "☁️";
  } else if (nextDay3Weather === "Clear") {
    var day3Icon = "☀️";
  } else if (nextDay3Weather === "Snow") {
    var day3Icon = "❄️";
  } else if (nextDay3Weather === "Rain") {
    var day3Icon = "🌧️";
  }
  makeDay3(day3Icon, nextDay3Temp, nextDay3Wind, nextDay3Humidity);

  var nextDay4Weather = nextDays[3].weather[0].main;
  var nextDay4Temp = nextDays[3].main.temp;
  var nextDay4Wind = nextDays[3].wind.speed;
  var nextDay4Humidity = nextDays[3].main.humidity;
  if (nextDay4Weather === "Clouds") {
    var day4Icon = "☁️";
  } else if (nextDay4Weather === "Clear") {
    var day4Icon = "☀️";
  } else if (nextDay4Weather === "Snow") {
    var day4Icon = "❄️";
  } else if (nextDay4Weather === "Rain") {
    var day4Icon = "🌧️";
  }
  makeDay4(day4Icon, nextDay4Temp, nextDay4Wind, nextDay4Humidity);

  var nextDay5Weather = nextDays[4].weather[0].main;
  var nextDay5Temp = nextDays[4].main.temp;
  var nextDay5Wind = nextDays[4].wind.speed;
  var nextDay5Humidity = nextDays[4].main.humidity;
  if (nextDay5Weather === "Clouds") {
    var day5Icon = "☁️";
  } else if (nextDay5Weather === "Clear") {
    var day5Icon = "☀️";
  } else if (nextDay5Weather === "Snow") {
    var day5Icon = "❄️";
  } else if (nextDay5Weather === "Rain") {
    var day5Icon = "🌧️";
  }
  makeDay5(day5Icon, nextDay5Temp, nextDay5Wind, nextDay5Humidity);
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
// Day 1
function makeDay1(nextDayIcon, nextDayTemp, nextDayWind, nextDayHumidity) {
  var date = month + "/" + (day + 1) + "/" + year;
  var day1Date = document.createElement("h4");
  var day1Weather = document.createElement("h5");
  var day1Temp = document.createElement("h5");
  var day1Wind = document.createElement("h5");
  var day1Humidity = document.createElement("h5");
  day1Date.textContent = date;
  day1Weather.textContent = nextDayIcon;
  day1Temp.textContent = nextDayTemp + "°F";
  day1Wind.textContent = nextDayWind + "mph";
  day1Humidity.textContent = nextDayHumidity + "%";
  document
    .getElementById("next-day-1")
    .append(day1Date, day1Weather, day1Temp, day1Wind, day1Humidity);
}
// Day 2
function makeDay2(nextDayIcon, nextDayTemp, nextDayWind, nextDayHumidity) {
  var date = month + "/" + (day + 2) + "/" + year;
  var day2Date = document.createElement("h4");
  var day2Weather = document.createElement("h5");
  var day2Temp = document.createElement("h5");
  var day2Wind = document.createElement("h5");
  var day2Humidity = document.createElement("h5");
  day2Date.textContent = date;
  day2Weather.textContent = nextDayIcon;
  day2Temp.textContent = nextDayTemp + "°F";
  day2Wind.textContent = nextDayWind + "mph";
  day2Humidity.textContent = nextDayHumidity + "%";
  document
    .getElementById("next-day-2")
    .append(day2Date, day2Weather, day2Temp, day2Wind, day2Humidity);
}
// Day 3
function makeDay3(nextDayIcon, nextDayTemp, nextDayWind, nextDayHumidity) {
  var date = month + "/" + (day + 3) + "/" + year;
  var day3Date = document.createElement("h4");
  var day3Weather = document.createElement("h5");
  var day3Temp = document.createElement("h5");
  var day3Wind = document.createElement("h5");
  var day3Humidity = document.createElement("h5");
  day3Date.textContent = date;
  day3Weather.textContent = nextDayIcon;
  day3Temp.textContent = nextDayTemp + "°F";
  day3Wind.textContent = nextDayWind + "mph";
  day3Humidity.textContent = nextDayHumidity + "%";
  document
    .getElementById("next-day-3")
    .append(day3Date, day3Weather, day3Temp, day3Wind, day3Humidity);
}
// Day 4
function makeDay4(nextDayIcon, nextDayTemp, nextDayWind, nextDayHumidity) {
  var date = month + "/" + (day + 4) + "/" + year;
  var day4Date = document.createElement("h4");
  var day4Weather = document.createElement("h5");
  var day4Temp = document.createElement("h5");
  var day4Wind = document.createElement("h5");
  var day4Humidity = document.createElement("h5");
  day4Date.textContent = date;
  day4Weather.textContent = nextDayIcon;
  day4Temp.textContent = nextDayTemp + "°F";
  day4Wind.textContent = nextDayWind + "mph";
  day4Humidity.textContent = nextDayHumidity + "%";
  document
    .getElementById("next-day-4")
    .append(day4Date, day4Weather, day4Temp, day4Wind, day4Humidity);
}
// Day 5
function makeDay5(nextDayIcon, nextDayTemp, nextDayWind, nextDayHumidity) {
  var date = month + "/" + (day + 5) + "/" + year;
  var day5Date = document.createElement("h4");
  var day5Weather = document.createElement("h5");
  var day5Temp = document.createElement("h5");
  var day5Wind = document.createElement("h5");
  var day5Humidity = document.createElement("h5");
  day5Date.textContent = date;
  day5Weather.textContent = nextDayIcon;
  day5Temp.textContent = nextDayTemp + "°F";
  day5Wind.textContent = nextDayWind + "mph";
  day5Humidity.textContent = nextDayHumidity + "%";
  document
    .getElementById("next-day-5")
    .append(day5Date, day5Weather, day5Temp, day5Wind, day5Humidity);
}

// Save input to local storage
function saveInput(input) {
  var save = JSON.parse(localStorage.getItem("saved")) || [];
  var button = "btn";
  var city = input;
  save.push({ button, city });
  localStorage.setItem("saved", JSON.stringify(save));
  makeButton(save);
  console.log(save);
}

// Makes button from local storage
function makeButton(input) {
  var buttonEl = document.createElement("button");
  buttonEl.classList.add("btn", "btn-secondary", "m-1");
  buttonEl.textContent = input;
  userForm.append(buttonEl);
}

// Event Listener
userForm.addEventListener("submit", handleFormSubmit);
