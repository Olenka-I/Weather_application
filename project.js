function displayWeatherData(data) {
  let cityName = data.name;
  let currentTemp = Math.round(data.main.temp);

  document.querySelector(".topCity").textContent = cityName;
  document.querySelector(".temp").textContent = currentTemp;
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
