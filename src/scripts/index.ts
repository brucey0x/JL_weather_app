import { initAutocomplete } from "./googlemaps_api.js"
import { searchWeather, WeatherData } from "./openweather_api.js"
import { upgradeBackgroundImage } from "./unsplash_api.js"

type DomElement = HTMLElement | null

// Read DOM
/// Search elements
const searchBarElement: DomElement = document.querySelector(".search-bar")
const searchBarButton: DomElement = document.querySelector(".search-bar-button")
let inputElement = searchBarElement as HTMLInputElement

/// Weather elements
const cityElement: DomElement = document.querySelector(".city")
const tempElement: DomElement = document.querySelector(".temp")
const weatherDescriptionElement: DomElement = document.querySelector(
    ".weather-description"
)
const humidityElement: DomElement = document.querySelector(".humidity")
const windElement: DomElement = document.querySelector(".wind")

// eventListeners
searchBarElement?.addEventListener("keydown", (key: KeyboardEvent) => {
    if (key.key === "Enter" && searchBarElement) {
        let inputValue: string = inputElement.value
        search(inputValue)
        ;(searchBarElement as HTMLInputElement).value = ""
    }
})

searchBarButton?.addEventListener("click", () => {
    if (searchBarElement) {
        let inputValue: string = inputElement.value
        search(inputValue)
        ;(searchBarElement as HTMLInputElement).value = ""
    }
})

document.addEventListener("DOMContentLoaded", () => {
    if (searchBarElement) {
        let inputElement = searchBarElement as HTMLInputElement
        console.log(inputElement)
        initAutocomplete(inputElement)
    }
})

function prepareSearchQuery(query: string) {
    let firstWord = query.split(",")[0]
    return firstWord.charAt(0).toUpperCase() + firstWord.slice(1)
}

async function search(query: string) {
    const cityQuery = prepareSearchQuery(query)
    upgradeBackgroundImage(cityQuery)
    let weather: WeatherData = await searchWeather(cityQuery)
    if (weather && weather["name"] === cityQuery) {
        if (cityElement) cityElement.innerText = `Weather in ${weather["name"]}`
        if (tempElement)
            tempElement.innerText = `${weather["main"].temp}° degrees`
        if (weatherDescriptionElement)
            weatherDescriptionElement.innerText = `${weather["weather"][0].main}`
        if (humidityElement)
            humidityElement.innerText = `Humidity: ${weather["main"].humidity}%`
        if (windElement)
            windElement.innerText = `Wind speed: ${weather["wind"].speed}km/h`
    } else {
        alert("City not recognized. Try again.")
    }
    if (searchBarElement as HTMLInputElement) searchBarElement.value = ""
}
