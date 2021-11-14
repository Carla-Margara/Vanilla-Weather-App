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
console.log(days);
let day = days[now.getDay()];
console.log(day);
dayToday.innerHTML = `${day}`;
console.log(dayToday.innerHTML);

let h3 = document.querySelector("h3");
let hours = now.getHours();
console.log(hours);
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
h3.innerHTML = `${hours}:${minutes}`;
console.log(h3.innerHTML);

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#main-temp");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let realFeelElement = document.querySelector("#feels-like");
  realFeelElement.innerHTML = Math.round(response.data.main.feels_like);
  let cityElement = document.querySelector("#location");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#forecast");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humid");
  humidityElement.innerHTML = response.data.main.humidity;
  let pressureElement = document.querySelector("#pressure");
  pressureElement.innerHTML = Math.round(response.data.main.pressure);
  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "49edb86f4dbb0fed36d61d387d46af7e";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Arecibo&appid=${apiKey}&units=metric`;
console.log(apiUrl);

axios.get(apiUrl).then(displayTemperature);
