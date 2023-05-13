function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return ` ${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row2">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col2">
            <div class="day">${formatDay(forecastDay.dt)}</div>
            <img src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="sun cloud" class="cloudpic" />
            <div class="temp2"><strong>${Math.round(
              forecastDay.temp.max
            )}°</strong> ${Math.round(forecastDay.temp.min)}°</div>
            </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  const apiKey = "1d038ee28ef2727a9f0310860ac10ae9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherData(data) {
  let cityName = data.name;
  let currentTemp = Math.round(data.main.temp);
  let iconElement = document.querySelector("#icon");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  document.querySelector(".topCity").textContent = cityName;
  document.querySelector(".temp").textContent = currentTemp;

  celsiusTemperature = data.main.temp;

  descriptionElement.innerHTML = data.weather[0].description;
  humidityElement.innerHTML = data.main.humidity;
  windElement.innerHTML = Math.round(data.wind.speed);
  dateElement.innerHTML = formatDate(data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", data.weather[0].description);

  getForecast(data.coord);
}

function searchCity(event) {
  event.preventDefault();
  let searchTerm = document.querySelector(".search-bar").value.trim();
  if (!searchTerm) {
    return;
  }
  const apiKey = "58b5aa9f0965c501cceca4aadea0a9c2";
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${apiKey}&units=metric`
    )
    .then((response) => {
      displayWeatherData(response.data);
    })
    .catch((error) => {
      console.error(error);
      alert("Could not find weather data for entered city. Please try again.");
    });
}
function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let apiKey = "58b5aa9f0965c501cceca4aadea0a9c2";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
        axios.get(apiUrl).then((response) => {
          let weatherData = response.data;
          displayWeatherData(weatherData);
        });
      },
      (error) => {
        console.error(error);
        alert("Unable to retrieve your location");
      }
    );
  } else {
    alert("Geolocation is not supported by your browser");
  }
}
function displayFahrenhaitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("activeF");
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;

  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("activeF");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
let fahrenheitLink = document.querySelector("#fahrenheit-convert");
fahrenheitLink.addEventListener("click", displayFahrenhaitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

window.addEventListener("DOMContentLoaded", () => {
  searchCityWithDefaultTerm("Kyiv");
});

function searchCityWithDefaultTerm(searchTerm) {
  const apiKey = "58b5aa9f0965c501cceca4aadea0a9c2";
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${apiKey}&units=metric`
    )
    .then((response) => {
      displayWeatherData(response.data);
    })
    .catch((error) => {
      console.error(error);
      alert(
        "Could not find weather data for the default city. Please try again."
      );
    });
}
