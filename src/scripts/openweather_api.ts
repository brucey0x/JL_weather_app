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
                jsonData[0].lat,
                jsonData[0].lon
            ]
            console.log(
                `Coordinates are lat: ${coordinates[0]}, lon: ${coordinates[1]}`
            )
            return coordinates
        })
        .catch((error) => {
            console.error(
                "There was a problem with the Fetch operation:",
                error
            )
        })
}

export function getWeather(coordinates: [lat: number, lon: number]) {}
