const openWeatherApiKey: string = "4eabcfa5d810a9526b0d67462eb579ae"

export function getCoordinates(city: string) {
    let owGeoApiEndpoint = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${openWeatherApiKey}`
    console.log(`Endpoint is ${owGeoApiEndpoint}`)

    fetch(owGeoApiEndpoint)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network error")
            }
            console.log(response.json)
            return response.json()
        })
        .then(function (jsonData) {
            let coordinates: [lat: number, lon: number] = [
                jsonData.lat,
                jsonData.lon
            ]
            console.log(coordinates)
            return coordinates
        })
        .catch((error) => {
            console.error(
                "There was a problem with the Fetch operation:",
                error
            )
        })
}
