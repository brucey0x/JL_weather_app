type Coordinates = [lat: number, lon: number] | null
export type WeatherData = {
    weather: Array<{
        main: string
    }>
    main: {
        temp: number
        humidity: number
    }
    wind: {
        speed: number
    }
    name: string
} | null

// async function getCoordinates(city: string): Promise<Coordinates> {
//     let coordinates: Coordinates = null

//     try {
//         let owGeoApiEndpoint: string = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
//         const response = await fetch(owGeoApiEndpoint)
//         if (!response.ok) {
//             throw new Error("Network error")
//         }
//         const jsonData = await response.json()
//         coordinates = [jsonData[0].lat, jsonData[0].lon]
//         console.log(
//             `Coordinates for ${city} are lat: ${coordinates[0]}, lon: ${coordinates[1]}.`
//         )
//         return coordinates
//     } catch (error) {
//         console.error("There was a problem with the Fetch operation:", error)
//         return null
//     }
// }

// async function getWeather(coordinates: Coordinates): Promise<WeatherData> {
//     let weatherData: any = {}
//     if (coordinates) {
//         let owWeatherApiEndpoint2: string = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates[0]}&lon=${coordinates[1]}&units=metric&appid=${apiKey}`

//         try {
//             const response = await fetch(owWeatherApiEndpoint2)
//             if (!response.ok) {
//                 throw new Error("Network error")
//             }
//             const jsonData = await response.json()
//             weatherData = jsonData
//             console.log(weatherData)
//             return weatherData
//         } catch (error) {
//             console.error(
//                 "There was a problem with the Fetch operation:",
//                 error
//             )
//             return null
//         }
//     }

//     return weatherData
// }

export async function searchWeather(city: string): Promise<WeatherData> {
    try {
        // Call the new serverless API
        const apiEndpoint = `/api/openweather?city=${city}`
        const response = await fetch(apiEndpoint)
        if (!response.ok) {
            throw new Error("Network error")
        }
        const { geoData, weatherData } = await response.json()

        // ... your code to extract and format weather data ...
        return weatherData // Assuming it's formatted like your WeatherData type
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error)
        return null
    }
}

// const coordinates = await getCoordinates(city)
// return getWeather(coordinates)
