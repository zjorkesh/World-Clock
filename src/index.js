function updateCityTime(id,timeZone){
    let cityElement = document.querySelector(id);
    let timeElement = cityElement.querySelector(".time");
    let dateElement = cityElement.querySelector(".date");

    let cityTime = moment().tz(timeZone);

    dateElement.innerHTML = cityTime.format("MMMM Do YYYY")
    timeElement.innerHTML = `${cityTime.format("h:mm:ss")} <span class="period">${cityTime.format("A")}</span>`;
}

function updateTime() {
  updateCityTime("#los-angeles", "America/Los_Angeles");
  updateCityTime("#sydney", "Australia/Sydney");
  updateCityTime("#tokyo", "Asia/Tokyo");
}

function updateCity(event){
    let timeZone = event.target.value;
    if (timeZone==='current'){
        timeZone = moment.tz.guess();
    }
    if (timeZone.length === 0) {
        return;
    }
    let cityName = timeZone.split("/")[1].replaceAll("_", " ");
    let cityTime = moment().tz(timeZone);

    let citiesElement = document.querySelector(".cities");
    
    citiesElement.innerHTML =`
            <div class="city">
            <h2><span >${cityName} </span> <span class="time">${cityTime.format("h:mm:ss")}<span class="period"> ${cityTime.format("A")}</span></span></h2>
            <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
        </div>`;
}
 
function displayTimeZone(timezone){

    selectElement.innerHTML +=`
    <option value ="${timezone}">${timezone}</option>`;
}

let selectElement = document.querySelector("#city-select");
selectElement.addEventListener("change", updateCity);

let timezones = Intl.supportedValuesOf("timeZone");
timezones.forEach(displayTimeZone);

updateTime();
setInterval(updateTime, 1000);

