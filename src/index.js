let selectedTimeZone = null;
let currentCoordinates = null;
const apiKey = "8f8ba35f23t75fbc75d7do5424f8040b";

let selectedNameElement = document.querySelector(".selected-name");
let selectedTimeElement = document.querySelector(".selected-time");
let selectedDateElement = document.querySelector(".selected-date");
let selectedDayElement = document.querySelector(".selected-day");

let selectedCityBox = document.querySelector(".selected-city");
let differenceBox = document.querySelector(".time-difference");
let comparisonBox = document.querySelector(".comparison");

function updateCityTime(id, timeZone) {
  let cityElement = document.querySelector(id);
  let timeElement = cityElement.querySelector(".time");
  let dateElement = cityElement.querySelector(".date");
  let dayElement = cityElement.querySelector(".day");

  let cityTime = moment().tz(timeZone);

  if (id === "#current") {
    let currentCityName = timeZone.split("/").pop().replaceAll("_", " ");
    cityElement.querySelector("h2").textContent = currentCityName;
  }

  dateElement.innerHTML = cityTime.format("MMMM Do YYYY");
  timeElement.innerHTML = `${cityTime.format("h:mm:ss")} <span class="period">${cityTime.format("A")}</span>`;
  dayElement.innerHTML = cityTime.format("dddd");
}

function updateTime() {
  let currentTimeZone = moment.tz.guess();
  updateCityTime("#current", currentTimeZone);

  let cityName = currentTimeZone.split("/").pop().replaceAll("_", " ");

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}`;

  axios.get(apiUrl).then(showCountry);

  updateCityTime("#los-angeles", "America/Los_Angeles");
  updateCityTime("#sydney", "Australia/Sydney");
  updateCityTime("#tokyo", "Asia/Tokyo");
  if (selectedTimeZone) {
    updateDetails(selectedTimeZone);
  }
}

function updateDetails(timeZone) {
  let cityName = timeZone.split("/").pop().replaceAll("_", " ");
  let cityTime = moment().tz(timeZone);

  selectedNameElement.innerHTML = cityName;
  selectedTimeElement.innerHTML = cityTime.format("h:mm:ss A");
  selectedDateElement.innerHTML = cityTime.format("MMMM Do YYYY");
  selectedDayElement.innerHTML = cityTime.format("dddd");
}

function updateCity(event) {
  let timeZone = event.target.value;

  if (timeZone.length === 0) {
    return;
  }
  selectedTimeZone = timeZone;

  updateDetails(timeZone);
  selectedCityBox.style.display = "block";
  differenceBox.style.display = "block";
  comparisonBox.style.display = "grid";
  selectElement.selectedIndex = event.target.selectedIndex;
  selectElement.size = 1;
  document.querySelector(".layout").classList.add("selected");
}

function updateSelectedCity(timeZone) {
  let cityElement = document.querySelector("#selected-city");

  if (cityElement) {
    let timeElement = cityElement.querySelector(".time");
    let dateElement = cityElement.querySelector(".date");
    let dayElement = cityElement.querySelector(".day");

    let cityTime = moment().tz(timeZone);

    dateElement.innerHTML = cityTime.format("MMMM Do YYYY");
    timeElement.innerHTML = `${cityTime.format("h:mm:ss")} <span class="period">${cityTime.format("A")}</span>`;
    dayElement.innerHTML = cityTime.format("dddd");
  }
}

function displayTimeZone(timezone) {
  selectElement.innerHTML += `
    <option value ="${timezone}">${timezone}</option>`;
}

function showCountry(response) {
  console.log(response.data);
  let country = response.data.country;

  document.querySelector("#current .country").textContent = country;
}

let selectElement = document.querySelector("#city-select");
selectElement.addEventListener("change", updateCity);

let timezones = Intl.supportedValuesOf("timeZone");
timezones.forEach(displayTimeZone);

updateTime();
setInterval(updateTime, 1000);
