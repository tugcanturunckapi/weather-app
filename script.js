const apiKey = "96f8f25d865daffd78e49f8b6fc7aaf4";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

if (response.status == 404) {
const errorDiv = document.querySelector(".error");
errorDiv.classList.add("show");
document.querySelector(".weather").classList.remove("show");
weatherIcon.src = "images/cross.png"; // Hatalı şehir durumunda hata ikonunu göster
} else {
var data = await response.json();

console.log(data);
document.querySelector(".city").innerHTML = data.name;
document.querySelector(".temp").innerHTML =
Math.round(data.main.temp) + "°c";
document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

if (data.weather[0].main == "Clouds") {
weatherIcon.src = "images/clouds.png";
} else if (data.weather[0].main == "Clear") {
weatherIcon.src = "images/clear.png";
} else if (data.weather[0].main == "Rain") {
weatherIcon.src = "images/rain.png";
} else if (data.weather[0].main == "Drizzle") {
weatherIcon.src = "images/drizzle.png";
} else if (data.weather[0].main == "Mist") {
weatherIcon.src = "images/mist.png";
} else if (data.weather[0].main == "Snow") {
weatherIcon.src = "images/snow.png";
}

document.querySelector(".weather").classList.add("show");
document.querySelector(".error").classList.remove("show");
}
}


searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});

document.addEventListener("mousemove", function (e) {
  const xPos = (e.clientX / window.innerWidth) * 100;
  const yPos = (e.clientY / window.innerHeight) * 100;
  const style = `
          @keyframes AnimationName {
              0% { background-position: ${xPos}% ${yPos}% }
              50% { background-position: ${100 - xPos}% ${100 - yPos}% }
              100% { background-position: ${xPos}% ${yPos}% }
          }
      `;
  const styleElement = document.createElement("style");
  styleElement.innerHTML = style;
  document.head.appendChild(styleElement);
});