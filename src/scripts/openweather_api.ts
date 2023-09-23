type Coordinates = [lat: number, lon: number] | null
type Temp = number | null

const openWeatherApiKey: string = "4eabcfa5d810a9526b0d67462eb579ae"

function getCoordinates(city: string): Promise<Coordinates> {
    let owGeoApiEndpoint: string = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${openWeatherApiKey}`

    let coordinates: Coordinates = null

    fetch(owGeoApiEndpoint)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network error")
            }
            return response.json()
        })
        .then((jsonData) => {
            coordinates = [jsonData[0].lat, jsonData[0].lon]
            console.log(
                `Coordinates are lat: ${coordinates[0]}, lon: ${
                    coordinates[1]
                } and temp is ${getTemp(coordinates)}`
            )
            return coordinates
        })
        .catch((error) => {
            console.error(
                "There was a problem with the Fetch operation:",
                error
            )
            return null
        })
        .finally(() => coordinates || "No coordinates available.")
}

function getTemp(coordinates: Coordinates): Promise<Temp> {
    if (coordinates) {
        let owWeatherApiEndpoint2: string = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates[0]}&lon=${coordinates[1]}&units=metric&appid=${openWeatherApiKey}`
        console.log(`Weather Endpoint 2.5 is ${owWeatherApiEndpoint2}`)

        let currentTemp: Temp = null

        fetch(owWeatherApiEndpoint2)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network error")
                }
                return response.json()
            })
            .then((jsonData) => {
                let currentTemp: Temp = jsonData.main.temp
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
                return null
            })
            .finally(() => currentTemp || "No weather data available.")
    }

    // let owWeatherApiEndpoint3 = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates[0]}&lon=${coordinates[1]}&units=metric&exclude=hourly,daily&appid=${openWeatherApiKey}`
    // console.log(`Weather Endpoint 3 is ${owWeatherApiEndpoint3}`)
}

function searchWeather(city: string): Promise<Temp> {
    const coordinates = getCoordinates(city)
    return getTemp(coordinates)
}
