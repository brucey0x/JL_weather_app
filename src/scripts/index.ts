console.log("helloz")

const searchBarElement: HTMLElement | null =
    document.querySelector(".search-bar")
console.log(`searchBarElement is ${searchBarElement}`)

const searchBarButton: HTMLElement | null =
    document.querySelector(".search-bar-button")
console.log(`searchBarButton is ${searchBarButton}`)

searchBarElement?.addEventListener("keydown", (key: KeyboardEvent) => {
    if (key.key === "Enter" && searchBarElement) {
        let inputValue = (searchBarElement as HTMLInputElement).value
        search(inputValue)
        ;(searchBarElement as HTMLInputElement).value = ""
        console.log(`search for ${inputValue} executed`)
    }
})

searchBarButton?.addEventListener("click", () => {
    if (searchBarElement) {
        let inputValue = (searchBarElement as HTMLInputElement).value
        search(inputValue)
        ;(searchBarElement as HTMLInputElement).value = ""
        console.log(`search for ${inputValue} executed`)
    }
})

// Create a function that searches the weather API
function search(query: string) {}
