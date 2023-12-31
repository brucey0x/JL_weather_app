import { initAutocomplete, verifyUserInput } from "./googlemaps_api.js"
import { WeatherData, searchWeather } from "./openweather_api.js"
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
searchBarElement?.addEventListener("keydown", async (key: KeyboardEvent) => {
    if (key.key === "Enter") {
        let inputValue = getInputValue()
        if (inputValue) {
            try {
                await verifyUserInput(inputValue, search, inputElement)
            } catch (error) {
                console.error(error)
            }
        }
    }
})

searchBarButton?.addEventListener("click", async () => {
    let inputValue = getInputValue()
    if (inputValue) {
        try {
            await verifyUserInput(inputValue, search, inputElement)
        } catch (error) {
            console.error(error)
        }
    }
})

document.addEventListener("DOMContentLoaded", () => {
    if (searchBarElement) {
        initAutocomplete(inputElement, search)
    }
})

function getInputValue(): string | null {
    let inputValue: string = inputElement.value
    if (inputValue) return inputValue
    return null
}

function prepareSearchQuery(query: string) {
    let firstWord = query.split(",")[0]
    return firstWord.charAt(0).toUpperCase() + firstWord.slice(1)
}

async function search(query: string) {
    const cityQuery = prepareSearchQuery(query)
    console.log(`Search query initialized for city: ${cityQuery}`)

    upgradeBackgroundImage(cityQuery)
    let weather: WeatherData = await searchWeather(cityQuery)
    if (!weather) {
        console.log("Weather data is unavailable.")
        return
    }

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
}
