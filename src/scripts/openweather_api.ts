type Coordinates = [lat: number, lon: number] | null
type Temp = number | null

const openWeatherApiKey: string = "4eabcfa5d810a9526b0d67462eb579ae"

async function getCoordinates(city: string): Promise<Coordinates> {
    let coordinates: Coordinates = null

    try {
        let owGeoApiEndpoint: string = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${openWeatherApiKey}`
        const response = await fetch(owGeoApiEndpoint)
        if (!response.ok) {
            throw new Error("Network error")
        }
        const jsonData = await response.json()
        coordinates = [jsonData[0].lat, jsonData[0].lon]
        console.log(
            `Coordinates are lat: ${coordinates[0]}, lon: ${coordinates[1]}.}`
        )
        return coordinates
    } catch (error) {
        console.error("There was a problem with the Fetch operation:", error)
        return null
    }

    // fetch(owGeoApiEndpoint)
    //     .then((response) => {
    //         if (!response.ok) {
    //             throw new Error("Network error")
    //         }
    //         return response.json()
    //     })
    //     .then((jsonData) => {
    //         coordinates = [jsonData[0].lat, jsonData[0].lon]
    //         console.log(
    //             `Coordinates are lat: ${coordinates[0]}, lon: ${
    //                 coordinates[1]
    //             } and temp is ${getTemp(coordinates)}`
    //         )
    //         return coordinates
    //     })
    //     .catch((error) => {
    //         console.error(
    //             "There was a problem with the Fetch operation:",
    //             error
    //         )
    //         return null
    //     })
    //     .finally(() => coordinates || "No coordinates available.")
}

async function getTemp(coordinates: Coordinates): Promise<Temp> {
    let currentTemp: Temp = null
    if (coordinates) {
        let owWeatherApiEndpoint2: string = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates[0]}&lon=${coordinates[1]}&units=metric&appid=${openWeatherApiKey}`
        console.log(`Weather Endpoint 2.5 is ${owWeatherApiEndpoint2}`)

        try {
            const response = await fetch(owWeatherApiEndpoint2)
            if (!response.ok) {
                throw new Error("Network error")
            }
            const jsonData = await response.json()
            currentTemp = jsonData.main.temp
            console.log(
                `Current temperature is ${currentTemp} and currentTemp is type ${typeof currentTemp}.`
            )
            return currentTemp
        } catch (error) {
            console.error(
                "There was a problem with the Fetch operation:",
                error
            )
            return null
        }
        // fetch(owWeatherApiEndpoint2)
        //     .then((response) => {
        //         if (!response.ok) {
        //             throw new Error("Network error")
        //         }
        //         return response.json()
        //     })
        //     .then((jsonData) => {
        //         let currentTemp: Temp = jsonData.main.temp
        //         console.log(
        //             `Current temperature is ${currentTemp} and currentTemp is type ${typeof currentTemp}.`
        //         )

        //         return currentTemp
        //     })
        //     .catch((error) => {
        //         console.error(
        //             "There was a problem with the Fetch operation:",
        //             error
        //         )
        //         return null
        //     })
        //     .finally(() => currentTemp || "No weather data available.")
    }

    return currentTemp
    // let owWeatherApiEndpoint3 = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates[0]}&lon=${coordinates[1]}&units=metric&exclude=hourly,daily&appid=${openWeatherApiKey}`
    // console.log(`Weather Endpoint 3 is ${owWeatherApiEndpoint3}`)
}

export async function searchWeather(city: string): Promise<Temp> {
    const coordinates = await getCoordinates(city)
    return getTemp(coordinates)
}
