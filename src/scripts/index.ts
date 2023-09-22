import { getCoordinates } from "./openweather_api.js"
import { upgradeBackgroundImage } from "./unsplash_api.js"

// Read DOM
const searchBarElement: HTMLElement | null =
    document.querySelector(".search-bar")
const searchBarButton: HTMLElement | null =
    document.querySelector(".search-bar-button")
const cityElement: HTMLHeadingElement | null = document.querySelector(".city")
const tempElement: HTMLElement | null = document.querySelector(".temp")
const weatherDescriptionButton: HTMLElement | null = document.querySelector(
    ".weather-description"
)
const humidityElement: HTMLElement | null = document.querySelector(".humidity")
const windElement: HTMLElement | null = document.querySelector(".wind")

// eventListeners
searchBarElement?.addEventListener("keydown", (key: KeyboardEvent) => {
    if (key.key === "Enter" && searchBarElement) {
        let inputValue: string = (searchBarElement as HTMLInputElement).value
        search(inputValue)
        ;(searchBarElement as HTMLInputElement).value = ""
        console.log(`search for ${inputValue} executed`)
    }
})

searchBarButton?.addEventListener("click", () => {
    if (searchBarElement) {
        let inputValue: string = (searchBarElement as HTMLInputElement).value
        search(inputValue)
        ;(searchBarElement as HTMLInputElement).value = ""
        console.log(`search for ${inputValue} executed`)
    }
})

// Create a function that searches the weather API. Need to export the search to pull the right Unsplash image for the background.
function search(query: string) {
    upgradeBackgroundImage(query)
    if (cityElement) cityElement.innerText = `Weather in ${query}`
    getCoordinates(query)
}
