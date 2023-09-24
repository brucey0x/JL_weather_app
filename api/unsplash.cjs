// ./api/unsplash.js
import fetch from "node-fetch"

export default async (req, res) => {
    const apiKey = process.env.UNSPLASH_API_KEY
    const searchQuery = req.query.searchQuery

    try {
        const apiEndpoint = `https://api.unsplash.com/photos/random?query=${searchQuery}&orientation=landscape&client_id=${apiKey}`
        const response = await fetch(apiEndpoint)

        if (!response.ok) {
            throw new Error("Network error")
        }

        const jsonData = await response.json()
        res.json(jsonData)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch Unsplash data" })
    }
}
