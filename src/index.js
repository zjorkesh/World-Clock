function updateTime(){

    let losAngelesElement = document.querySelector("#los-angeles");
    let losAngelesTimeElement = losAngelesElement.querySelector(".time");
    let losAngelesDateElement = losAngelesElement.querySelector(".date");
    let losAngelesTime = moment().tz("America/Los_Angeles")
    
    losAngelesDateElement.innerHTML =losAngelesTime.format("MMMM Do YYYY");
    losAngelesTimeElement.innerHTML= `${losAngelesTime.format("h:mm:ss")} <span class="period">${losAngelesTime.format("A")}</span>`;
    
    
    let sydneyElement = document.querySelector("#sydney");
    let sydneyTimeElement = sydneyElement.querySelector(".time");
    let sydneyDateElement = sydneyElement.querySelector(".date");
    let sydneyTime = moment().tz("Australia/Sydney")
    
    sydneyDateElement.innerHTML = sydneyTime.format("MMMM Do YYYY");
    sydneyTimeElement.innerHTML= `${sydneyTime.format("h:mm:ss")} <span class="period">${sydneyTime.format("A")}</span>`;
    
    let tokyoElement = document.querySelector("#tokyo");
    let tokyoTimeElement = tokyoElement.querySelector(".time");
    let tokyoDateElement = tokyoElement.querySelector(".date");
    let tokyoTime = moment().tz("Asia/Tokyo");
    
    tokyoDateElement.innerHTML = tokyoTime.format("MMMM Do YYYY");
    tokyoTimeElement.innerHTML = `${tokyoTime.format("h:mm:ss")} <span class="period">${tokyoTime.format("A")}</span>`;
}    
updateTime();
setInterval(updateTime, 1000);



