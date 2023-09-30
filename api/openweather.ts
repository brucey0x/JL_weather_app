import type { VercelRequest, VercelResponse } from "@vercel/node"

import fetch from "node-fetch"

export default async (req: VercelRequest, res: VercelResponse) => {
    const apiKey = process.env.OPEN_WEATHER_API_KEY
    const city = req.query.city as string
    try {
        // Fetch coordinates
        const geoEndpoint = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
        const geoResponse = await fetch(geoEndpoint)

        if (!geoResponse.ok) {
            res.status(404).json({ error: "Failed to fetch city data." })
            return
        }
        console.log(`geoResponse is:`)
        console.log(geoResponse)

        const geoData: any = await geoResponse.json()
        const { lat, lon } = geoData[0]

        // Fetch weather
        const weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        const weatherResponse = await fetch(weatherEndpoint)
        if (!weatherResponse.ok) {
            res.status(404).json({ error: "Failed to fetch weather data." })
            return
        }
        console.log(`weatherResponse is:`)
        console.log(weatherResponse)

        const weatherData = await weatherResponse.json()
        res.status(200).json(weatherData)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Failed to fetch weather data" })
    }
}
