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

export async function searchWeather(city: string): Promise<WeatherData> {
    try {
        // Call the new serverless API
        const apiEndpoint = `/api/openweather?city=${city}`
        const response = await fetch(apiEndpoint)
        if (!response.ok) {
            throw new Error("Network error")
        }
        const weatherData = await response.json()
        return weatherData
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error)
        return null
    }
}
