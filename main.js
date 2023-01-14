import "./style.css"
import { getWeather } from "./weather"
import { ICON_MAP } from "./iconMap"

let cityNamePrefix = "Guangzhou"
const cityInfo = {
  latitude: 20,
  longitude: 113,
  cityName:  "Guangzhou"
}

const geoApiOtions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '49ec160365msh7d22e7e92c04b27p1dcceejsn025831e1e74c',
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
}

const searchInput = document.querySelector("[data-search]")
const cityElem = document.querySelector(".city")
const setCity = document.querySelector("[data-set-city]")
const GEO_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities?"


setCity.addEventListener('click', () => {
  if(searchInput.value == null) return
  cityNamePrefix = searchInput.value

  fetch(`${GEO_URL}minPopulation=100000&namePrefix=${cityNamePrefix}`, geoApiOtions)
  .then(response => response.json())
  .then(res => {
    console.log(res)
      setCityTitle(res.data[0].name)
      getWeather(res.data[0].latitude, res.data[0].longitude, Intl.DateTimeFormat().resolvedOptions().timeZone).then
(renderWeather).catch(e =>{
  console.error(e)

    return
  })
  .catch(err => console.error(err));
  searchInput.value = ""
})
 
})


setCityTitle(cityInfo.cityName)

getWeather(cityInfo.latitude, cityInfo.longitude, Intl.DateTimeFormat().resolvedOptions().timeZone).then
(renderWeather).catch(e =>{
  console.error(e)
  alert("Error getting weather.")
})


function renderWeather({current, daily, hourly}){
  renderCurrentWeather(current)
  renderDailyWeather(daily)
  renderHourlyWeather(hourly) 
  document.body.classList.remove("blurred")
}

function setValue(selector, value, { parent = document} = {}){
  parent.querySelector(`[data-${selector}]`).textContent = value
}

function getIconUrl(iconCode) {
  return `icons/${ICON_MAP.get(iconCode)}.svg`
}

const currentIcon = document.querySelector("[data-current-icon]")
function renderCurrentWeather(current) {
  currentIcon.src = getIconUrl(current.iconCode)
  setValue("current-temp", current.currentTemp)
  setValue("current-high", current.highTemp)
  setValue("current-low", current.lowTemp)
  setValue("current-fl-high", current.highFeelsLike)
  setValue("current-fl-low", current.lowFeelsLike)
  setValue("current-wind", current.windSpeed)
  setValue("current-precip", current.precip)
}


const DAY_FORMATTER = new Intl.DateTimeFormat('en-US', {weekday: 'short' })
const dailySection = document.querySelector("[data-day-section]")
const dayCardTemplate = document.getElementById("day-card-template")
function renderDailyWeather(daily) {
  dailySection.innerHTML = ""
  daily.forEach(day => {
    const element = dayCardTemplate.content.cloneNode(true)
    setValue("temp", day.maxTemp, { parent: element })
    setValue("date", DAY_FORMATTER.format(day.timestamp), {parent: element})
    element.querySelector("[data-icon]").src = getIconUrl(day.iconCode)
    dailySection.append(element)
  })
}

const HOUR_FORMATTER = new Intl.DateTimeFormat('en-US', { hour: 'numeric' })
const hourlySection = document.querySelector("[data-hour-section]")
const hourRowTemplate = document.getElementById("hour-row-template")
function renderHourlyWeather(hourly) {
  hourlySection.innerHTML = ""
  hourly.forEach(hour => {
    const element = hourRowTemplate.content.cloneNode(true)
    setValue("temp", hour.temp, { parent: element })
    setValue("fl-temp", hour.feelsLike, { parent: element })
    setValue("wind", hour.windSpeed, { parent: element })
    setValue("precip", hour.precip, { parent: element })
    setValue("day", DAY_FORMATTER.format(hour.timestamp),  { parent: element })
    setValue("time", HOUR_FORMATTER.format(hour.timestamp), { parent: element })
    element.querySelector("[data-icon]").src = getIconUrl(hour.iconCode)
    hourlySection.append(element)
  })
}



 function setCityTitle(cityName){
	if (cityName == null) {
		cityElem.textContent = "Guangzhou"
	}
	cityElem.textContent = cityName
}

