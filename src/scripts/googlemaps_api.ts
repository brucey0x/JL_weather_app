let apiKey: string = ""

async function fetchApiKey(): Promise<void> {
    try {
        const res = await fetch("/api/googlemaps")
        const data = await res.json()
        apiKey = data.apiKey
    } catch (error) {
        console.error("Error fetching API key:", error)
    }
}

// let apiKey: string = ""
// if (process.env.GOOGLE_MAPS_API_KEY) {
//     apiKey = process.env.GOOGLE_MAPS_API_KEY
// }
// console.log(apiKey)

// const googleMapsApiEndpoint: string = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=Function.prototype`

async function loadGoogleMapsApi(): Promise<void> {
    await fetchApiKey()

    if (!fetchApiKey) {
        console.error("API key not found")
        return
    }

    const googleMapsApiEndpoint: string = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=Function.prototype`

    return new Promise((resolve) => {
        const script: HTMLScriptElement = document.createElement("script")
        script.type = "module"
        script.src = googleMapsApiEndpoint
        script.defer = true
        script.onload = () => {
            resolve()
        }
        console.log(script)
        document.head.appendChild(script)
    })
}

export async function initAutocomplete(
    inputElement: HTMLInputElement,
    searchFunction: (query: string) => void
): Promise<void> {
    console.log("Autocomplete initialized")
    await loadGoogleMapsApi()

    const options = {
        types: ["(cities)"] // restrict autocomplete to city names only
    }

    const autocomplete = new google.maps.places.Autocomplete(
        inputElement,
        options
    )
    console.log(autocomplete)

    // Event listener for place changes
    autocomplete.addListener("place_changed", () => {
        const place: any = autocomplete.getPlace()

        if (place.geometry && place.types.includes("locality")) {
            const query = place.formatted_address
            searchFunction(query) // This will call the `search` function you defined in index.ts
        } else {
            console.log("No details available for the selected place.")
            return
        }
    })
}
