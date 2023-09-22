const openWeatherApiKey: string = "4eabcfa5d810a9526b0d67462eb579ae"

export function getCoordinates(city: string) {
    let owGeoApiEndpoint = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${openWeatherApiKey}`
    console.log(`Endpoint is ${owGeoApiEndpoint}`)

    fetch(owGeoApiEndpoint)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network error")
            }
            return response.json()
        })
        .then(function (jsonData) {
            let coordinates: [lat: number, lon: number] = [
                jsonData[0].lat,
                jsonData[0].lon
            ]
            console.log(
                `Coordinates are lat: ${coordinates[0]}, lon: ${
                    coordinates[1]
                } and temp is ${getWeather(coordinates)}`
            )
            return getWeather(coordinates)
        })
        .catch((error) => {
            console.error(
                "There was a problem with the Fetch operation:",
                error
            )
        })
}

export function getWeather(coordinates: [lat: number, lon: number]) {
    console.log(`Coordinates are ${coordinates}`)

    let owWeatherApiEndpoint2 = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates[0]}&lon=${coordinates[1]}&units=metric&appid=${openWeatherApiKey}`
    console.log(`Weather Endpoint 2.5 is ${owWeatherApiEndpoint2}`)

    // let owWeatherApiEndpoint3 = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates[0]}&lon=${coordinates[1]}&units=metric&exclude=hourly,daily&appid=${openWeatherApiKey}`
    // console.log(`Weather Endpoint 3 is ${owWeatherApiEndpoint3}`)

    fetch(owWeatherApiEndpoint2)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network error")
            }
            return response.json()
        })
        .then(function (jsonData) {
            let currentTemp: number = jsonData.main.temp
            console.log(
                `Current temperature is ${currentTemp} and currentTemp is type ${typeof currentTemp}.`
            )
            return currentTemp
        })
        .catch((error) => {
            console.error(
                "There was a problem with the Fetch operation:",
                error
            )
        })
}
