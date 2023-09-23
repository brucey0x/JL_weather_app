const apiKey: string = `AIzaSyAW8FuZH2M0r3cAvk1xSb6XhOIrhQjE_go`

const googleMapsApiEndpoint: string = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=Function.prototype`

// const googleMapsApiEndpoint: string = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`

function loadGoogleMapsApi(): Promise<void> {
    return new Promise((resolve) => {
        const script: HTMLScriptElement = document.createElement("script")
        console.log(script)
        script.type = "module"
        script.src = googleMapsApiEndpoint
        script.async = true
        script.defer = true
        script.onload = () => {
            resolve()
        }
        document.head.appendChild(script)
    })
}

export async function initAutocomplete(
    inputElement: HTMLInputElement
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

        if (!place.geometry || !place.types.includes("locality")) {
            // User entered the name of a non-city or place not in the autocomplete list
            console.log("No details available for the selected place.")
            return
        }
    })
}
