/* ====================
   Global Variables
==================== */
let selectedTimeZone = null;

const apiKey = "8f8ba35f23t75fbc75d7do5424f8040b";

/* ====================
   DOM Elements
==================== */
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

let comparisonText = document.querySelector(".comparison-text");
let selectElement = document.querySelector("#city-select");

/* ====================
   Time Functions
==================== */
function updateCityTime(id, timeZone) {
  let cityElement = document.querySelector(id);
  let timeElement = cityElement.querySelector(".time");
  let dateElement = cityElement.querySelector(".date");
  let dayElement = cityElement.querySelector(".day");

  let cityTime = moment().tz(timeZone);

  let differenceElement = cityElement.querySelector(".difference");

  let currentOffset = moment().utcOffset();
  let cityOffset = cityTime.utcOffset();

  let differenceMinutes = cityOffset - currentOffset;
  let difference = differenceMinutes / 60;

  if (id === "#current") {
    let currentCityName = timeZone.split("/").pop().replaceAll("_", " ");
    cityElement.querySelector("h2").textContent = currentCityName;
  }

  if (differenceElement) {
    let totalMinutes = Math.abs(differenceMinutes);

    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;

    let differenceText = "";

    if (hours > 0) {
      differenceText += `${hours} ${hours === 1 ? "hour" : "hours"}`;
    }

    if (minutes > 0) {
      if (differenceText !== "") differenceText += " ";
      differenceText += `${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
    }

    if (difference > 0) {
      differenceElement.textContent = `${differenceText} ahead`;
      differenceElement.className = "difference ahead";
    } else if (difference < 0) {
      differenceElement.textContent = `${differenceText} behind`;
      differenceElement.className = "difference behind";
    } else {
      differenceElement.textContent = "Your Time";
      differenceElement.className = "difference same";
    }
  }
  dateElement.innerHTML = cityTime.format("MMMM Do YYYY");
  timeElement.innerHTML = `${cityTime.format("hh:mm:ss")} <span class="period">${cityTime.format("A")}</span>`;
  dayElement.innerHTML = cityTime.format("dddd");
}

function updateTime() {
  updateCityTime("#current", moment.tz.guess());
  updateCityTime("#los-angeles", "America/Los_Angeles");
  updateCityTime("#sydney", "Australia/Sydney");
  updateCityTime("#tokyo", "Asia/Tokyo");

  if (selectedTimeZone) {
    updateSelectedCityDetails(selectedTimeZone);
  }
}

function loadCurrentCountry() {
  let currentTimeZone = moment.tz.guess();
  let cityName = currentTimeZone.split("/").pop().replaceAll("_", " ");

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}`;

  axios.get(apiUrl).then(showCountry);
}

/* ====================
   Selected City
==================== */
function updateSelectedCityDetails(timeZone) {
  let cityName = timeZone.split("/").pop().replaceAll("_", " ");
  let cityTime = moment().tz(timeZone);

  selectedNameElement.innerHTML = cityName;
  selectedTimeElement.innerHTML = `${cityTime.format("hh:mm:ss")} <span class="period">${cityTime.format("A")}</span>`;
  selectedDateElement.innerHTML = cityTime.format("MMMM Do YYYY");
  selectedDayElement.innerHTML = cityTime.format("dddd");

  let currentTime = moment();

  let currentCity = moment.tz.guess().split("/").pop().replaceAll("_", " ");

  currentTimeElement.innerHTML = `${currentTime.format("hh:mm:ss")} <span class="current-period">${currentTime.format("A")}</span>`;

  selectedCityLabel.textContent = cityName;
  selectedCityTimeElement.innerHTML = `${cityTime.format("hh:mm:ss")} <span class="current-period">${cityTime.format("A")}</span>`;

  let selectedOffset = cityTime.utcOffset();
  let currentOffset = currentTime.utcOffset();

  let differenceMinutes = selectedOffset - currentOffset;
  let difference = differenceMinutes / 60;

  let totalMinutes = Math.abs(differenceMinutes);

  let hours = Math.floor(totalMinutes / 60);
  let minutes = totalMinutes % 60;

  let differenceText = "";

  if (hours > 0) {
    differenceText += `${hours} ${hours === 1 ? "hour" : "hours"}`;
  }

  if (minutes > 0) {
    if (differenceText !== "") differenceText += " ";
    differenceText += `${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
  }

  if (difference > 0) {
    comparisonText.innerHTML = `${cityName} is <span class="ahead-text">${differenceText} ahead</span> of ${currentCity}.`;
  } else if (difference < 0) {
    comparisonText.innerHTML = `${cityName} is <span class="behind-text">${differenceText} behind</span> of ${currentCity}.`;
  } else {
    comparisonText.textContent = `${cityName} is in the same time zone as ${currentCity}.`;
  }
}

/* ====================
   UI & Utility Functions
==================== */
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
        <p class="country">United States</p>
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
  loadCurrentCountry();
}

function displayTimeZone(timezone) {
  let cityName = timezone.split("/").pop().replaceAll("_", " ");

  selectElement.innerHTML += `
    <option value="${timezone}">${cityName}</option>`;
}

/* ====================
   API Functions
==================== */
function showCountry(response) {
  let country = response.data.country;

  document.querySelector("#current .country").textContent = country;
}

function showSelectedCountry(response) {
  selectedCountryElement.textContent = response.data.country;
}
/* ====================
   Event Handler
==================== */
function updateCity(event) {
  let timeZone = event.target.value;
  if (timeZone.length === 0) {
    return;
  }

  let cityName = timeZone.split("/").pop().replaceAll("_", " ");

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}`;

  axios.get(apiUrl).then(showSelectedCountry);

  selectedTimeZone = timeZone;

  updateSelectedCityDetails(timeZone);
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

  document.querySelector(".container").classList.add("selected");

  document.querySelector(".layout").classList.add("selected");
}

/* ====================
   Event Listeners
==================== */
selectElement.addEventListener("change", updateCity);

/* ====================
   Initialize
==================== */
let timezones = Intl.supportedValuesOf("timeZone");

timezones.sort((a, b) => {
  let cityA = a.split("/").pop().replaceAll("_", " ");
  let cityB = b.split("/").pop().replaceAll("_", " ");

  return cityA.localeCompare(cityB);
});

timezones.forEach(displayTimeZone);

loadCurrentCountry();
updateTime();
setInterval(updateTime, 1000);
