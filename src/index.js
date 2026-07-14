let selectedTimeZone = null;
let currentCoordinates = null;
const apiKey = "8f8ba35f23t75fbc75d7do5424f8040b";

let selectedNameElement = document.querySelector(".selected-name");
let selectedTimeElement = document.querySelector(".selected-time");
let selectedDateElement = document.querySelector(".selected-date");
let selectedDayElement = document.querySelector(".selected-day");

let selectedCityBox = document.querySelector(".selected-city");

let comparisonBox = document.querySelector(".time-comparison");

let selectedCityLabel = document.querySelector(".selected-city-label");
let selectedCityTimeElement = document.querySelector(".selected-city-time");
let selectedCountryElement = document.querySelector(".selected-country");

let currentTimeElement = document.querySelector(".current-time");
let timeDifferenceElement = document.querySelector(".time-diff");

let comparisonText = document.querySelector(".comparison-text");

function updateCityTime(id, timeZone) {
  let cityElement = document.querySelector(id);
  let timeElement = cityElement.querySelector(".time");
  let dateElement = cityElement.querySelector(".date");
  let dayElement = cityElement.querySelector(".day");

  let cityTime = moment().tz(timeZone);

  let differenceElement = cityElement.querySelector(".difference");

  let currentOffset = moment().utcOffset();
  let cityOffset = cityTime.utcOffset();

  let difference = (cityOffset - currentOffset) / 60;

  if (id === "#current") {
    let currentCityName = timeZone.split("/").pop().replaceAll("_", " ");
    cityElement.querySelector("h2").textContent = currentCityName;
  }

  if (differenceElement) {
    let hours = Math.abs(difference);
    let hourText = hours === 1 ? "hour" : "hours";

    if (difference > 0) {
      differenceElement.textContent = `${hours} ${hourText} ahead`;
      differenceElement.className = "difference ahead";
    } else if (difference < 0) {
      differenceElement.textContent = `${hours} ${hourText} behind`;
      differenceElement.className = "difference behind";
    } else {
      differenceElement.textContent = "Your Time";
      differenceElement.className = "difference same";
    }
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

  let currentTime = moment();

  currentTimeElement.textContent = currentTime.format("h:mm:ss A");

  selectedCityLabel.textContent = cityName;
  selectedCityTimeElement.textContent = cityTime.format("h:mm:ss A");
  let selectedOffset = cityTime.utcOffset();
  let currentOffset = currentTime.utcOffset();

  let difference = (selectedOffset - currentOffset) / 60;

  if (difference > 0) {
    comparisonText.textContent = `${cityName} is ${difference} hours ahead of your location.`;
  } else if (difference < 0) {
    comparisonText.textContent = `${cityName} is ${Math.abs(difference)} hours behind your location.`;
  } else {
    comparisonText.textContent = `${cityName} is in the same time zone as your location.`;
  }
}

function updateCity(event) {
  let timeZone = event.target.value;
  if (timeZone.length === 0) {
    return;
  }

  let cityName = timeZone.split("/").pop().replaceAll("_", " ");

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}`;

  axios.get(apiUrl).then(showSelectedCountry);
  selectedTimeZone = timeZone;

  updateDetails(timeZone);
  showCompactCities();

  selectedCityBox.style.display = "block";
  comparisonBox.style.display = "block";

  setTimeout(() => {
    selectedCityBox.classList.add("show");
  }, 50);

  setTimeout(() => {
    comparisonBox.classList.add("show");
  }, 200);
  selectElement.selectedIndex = event.target.selectedIndex;
  selectElement.size = 1;
  document.querySelector(".layout").classList.add("selected");
}

function showCompactCities() {
  let citiesList = document.querySelector("#cities-list");

  citiesList.innerHTML = `
    <article class="city compact" id="current">
      <div class="city-info">
        <h2></h2>
        <p class="country"></p>
      </div>

      <div class="city-right">
        <time class="time"></time>
        <time class="date"></time>
        <p class="day"></p>
        <p class="difference"></p>
      </div>
    </article>

    <article class="city compact" id="los-angeles">
      <div class="city-info">
        <h2>Los Angeles</h2>
        <p class="country">America</p>
      </div>

      <div class="city-right">
        <time class="time"></time>
        <time class="date"></time>
        <p class="day"></p>
        <p class="difference"></p>
      </div>
    </article>

    <article class="city compact" id="sydney">
      <div class="city-info">
        <h2>Sydney</h2>
        <p class="country">Australia</p>
      </div>

      <div class="city-right">
        <time class="time"></time>
        <time class="date"></time>
        <p class="day"></p>
        <p class="difference"></p>
      </div>
    </article>

    <article class="city compact" id="tokyo">
      <div class="city-info">
        <h2>Tokyo</h2>
        <p class="country">Japan</p>
      </div>

      <div class="city-right">
        <time class="time"></time>
        <time class="date"></time>
        <p class="day"></p>
        <p class="difference"></p>
      </div>
    </article>
  `;
  updateCityTime("#current", moment.tz.guess());
  updateCityTime("#los-angeles", "America/Los_Angeles");
  updateCityTime("#sydney", "Australia/Sydney");
  updateCityTime("#tokyo", "Asia/Tokyo");
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
  let country = response.data.country;

  document.querySelector("#current .country").textContent = country;
}

function showSelectedCountry(response) {
  selectedCountryElement.textContent = response.data.country;
}

let selectElement = document.querySelector("#city-select");
selectElement.addEventListener("change", updateCity);

let timezones = Intl.supportedValuesOf("timeZone");
timezones.forEach(displayTimeZone);

updateTime();
setInterval(updateTime, 1000);
