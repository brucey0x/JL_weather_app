/// <reference types="@types/google.maps" />
import {
    AutocompleteService,
    PlacesServiceStatus,
    QueryAutocompletionRequest
} from "google.maps"

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

// const googleMapsApiEndpoint: string = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=Function.prototype`

async function loadGoogleMapsApi(): Promise<void> {
    await fetchApiKey()

    if (!apiKey) {
        console.error("API key not found")
        return
    }

    const googleMapsApiEndpoint: string = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=en&callback`

    return new Promise((resolve) => {
        const script: HTMLScriptElement = document.createElement("script")
        script.type = "module"
        script.src = googleMapsApiEndpoint
        script.defer = true
        script.onload = () => {
            resolve()
        }
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
    console.log("Autocomplete is: ", autocomplete)

    // Event listener for place changes
    autocomplete.addListener("place_changed", () => {
        const place: any = autocomplete.getPlace()

        if (place.geometry && place.types.includes("locality")) {
            const query = place.formatted_address
            console.log(`Google search query is: `, query)
            searchFunction(query) // This will call the `search` function you defined in index.ts
        } else {
            console.log("No details available for the selected place.")
            return
        }
    })
}

// Perform a lookup based on the user's input and select the best match
export async function verifyUserInput(inputValue: string): Promise<string> {
    const service = new google.maps.places.AutocompleteService()

    return new Promise((resolve, reject) => {
        // Explicitly specify the type of request
        const request: google.maps.places.QueryAutocompletionRequest = { input: inputValue };

        // The 'as any' type assertion effectively turns off type-checking for this block
        // Use it if you're sure the API will handle it appropriately, even if TypeScript does not
        service.getQueryPredictions(request as any, function (predictions, status) {
            if (
                status === google.maps.places.PlacesServiceStatus.OK &&
                predictions
            ) {
                // For demonstration, we take the first prediction as the best match.
                // You can add more complex logic here if needed.
                const bestMatch = predictions[0]?.description;
                if (bestMatch) {
                    resolve(bestMatch);
                    return;
                }
            }
            reject("No match found");
        });
    });
}

