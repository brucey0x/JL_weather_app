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
    if (key.key === "Enter") {
        let inputValue = getInputValue()
        if (inputValue) search(inputValue)
    }
})

searchBarButton?.addEventListener("click", () => {
    let inputValue = getInputValue()
    if (inputValue) search(inputValue)
})

document.addEventListener("DOMContentLoaded", () => {
    if (searchBarElement) {
        initAutocomplete(inputElement, search)
    }
})

function getInputValue(): string | null {
    let inputValue: string = inputElement.value
    console.log(`inputValue is ${inputValue}`)
    if (inputValue) return inputValue
    return null
}

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
    // Try to clear the input field and fire an input event
    inputElement.value = ""
    const event = new Event("input", { bubbles: true, cancelable: true })
    inputElement.dispatchEvent(event)
}
