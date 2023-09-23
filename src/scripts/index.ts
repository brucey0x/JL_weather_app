import { searchWeather, WeatherData } from "./openweather_api.js"
import { upgradeBackgroundImage } from "./unsplash_api.js"

type DomElement = HTMLElement | null

// Read DOM
/// Search elements
const searchBarElement: DomElement = document.querySelector(".search-bar")
const searchBarButton: DomElement = document.querySelector(".search-bar-button")

/// Weather elements
const cityElement: DomElement = document.querySelector(".city")
const tempElement: DomElement = document.querySelector(".temp")
const weatherDescriptionElement: DomElement = document.querySelector(
    ".weather-description"
)
const humidityElement: DomElement = document.querySelector(".humidity")
const windElement: DomElement = document.querySelector(".wind")
const weatherElements = [
    cityElement,
    tempElement,
    weatherDescriptionElement,
    humidityElement,
    windElement
]

// eventListeners
searchBarElement?.addEventListener("keydown", (key: KeyboardEvent) => {
    if (key.key === "Enter" && searchBarElement) {
        let inputValue: string = (searchBarElement as HTMLInputElement).value
        search(inputValue)
        ;(searchBarElement as HTMLInputElement).value = ""
    }
})

searchBarButton?.addEventListener("click", () => {
    if (searchBarElement) {
        let inputValue: string = (searchBarElement as HTMLInputElement).value
        search(inputValue)
        ;(searchBarElement as HTMLInputElement).value = ""
    }
})

async function search(query: string) {
    upgradeBackgroundImage(query)
    if (cityElement) cityElement.innerText = `Weather in ${query}`
    let weather: WeatherData = await searchWeather(query)
    console.log(weather)
    if (weather) {
        console.log(
            `CurrentTemp is ${weather["main"].temp} of type ${typeof weather}.`
        )
        if (tempElement)
            tempElement.innerText = `${weather["main"].temp}° degrees`
        if (weatherDescriptionElement)
            weatherDescriptionElement.innerText = `${weather["weather"][0].main}`
        if (humidityElement)
            humidityElement.innerText = `${weather["main"].humidity}%`
        if (windElement)
            windElement.innerText = `Wind speed: ${weather["wind"].speed}km/h`
    }
}
