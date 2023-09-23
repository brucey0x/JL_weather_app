// /api/openweather.js
import fetch from "node-fetch"

module.exports = async (req, res) => {
    const apiKey = process.env.OPEN_WEATHER_API_KEY
    const city = req.query.city

    try {
        // Fetch coordinates
        const geoEndpoint = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
        const geoResponse = await fetch(geoEndpoint)
        const geoData = await geoResponse.json()
        const { lat, lon } = geoData[0]

        // Fetch weather
        const weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        const weatherResponse = await fetch(weatherEndpoint)
        const weatherData = await weatherResponse.json()

        res.json({ geoData, weatherData })
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch weather data" })
    }
}