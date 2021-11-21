let now = new Date();

let dayToday = document.querySelector("#day-today");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];

dayToday.innerHTML = `${day}`;

let h3 = document.querySelector("#now");
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
h3.innerHTML = `${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<ul class="list-group list-group-flush">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <li class="list-group-item">
      <div class="nextfive-forecast-date text-muted"> ${formatDay(
        forecastDay.dt
      )}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="46"
        />
        <div class="card-text nextfive-forecast-temperatures">
          <span class="nextfive-forecast-temperatures-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
        
          <span class="nextfive-forecast-temperatures-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </li>
      </ul> 
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "49edb86f4dbb0fed36d61d387d46af7e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&{apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#main-temp");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#location");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humid");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;

  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "49edb86f4dbb0fed36d61d387d46af7e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-text-input");
  search(cityInputElement.value);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#main-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Madrid");
