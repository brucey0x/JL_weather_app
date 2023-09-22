import { upgradeBackgroundImage } from "./unsplash_api.js"

// Read DOM
const searchBarElement: HTMLElement | null =
    document.querySelector(".search-bar")

const searchBarButton: HTMLElement | null =
    document.querySelector(".search-bar-button")

// eventListeners
searchBarElement?.addEventListener("keydown", (key: KeyboardEvent) => {
    if (key.key === "Enter" && searchBarElement) {
        let inputValue: string = (searchBarElement as HTMLInputElement).value
        search(inputValue)
        upgradeBackgroundImage(inputValue)
        ;(searchBarElement as HTMLInputElement).value = ""
        console.log(`search for ${inputValue} executed`)
    }
})

searchBarButton?.addEventListener("click", () => {
    if (searchBarElement) {
        let inputValue: string = (searchBarElement as HTMLInputElement).value
        search(inputValue)
        upgradeBackgroundImage(inputValue)
        ;(searchBarElement as HTMLInputElement).value = ""
        console.log(`search for ${inputValue} executed`)
    }
})

// Create a function that searches the weather API. Need to export the search to pull the right Unsplash image for the background.
function search(query: string) {}
