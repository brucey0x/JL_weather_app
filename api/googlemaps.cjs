module.exports = (req, res) => {
    console.log(
        "Checking environment variable:",
        process.env.GOOGLE_MAPS_API_KEY
    )
    const apiKey = process.env.GOOGLE_MAPS_API_KEY
    if (apiKey) {
        res.status(200).json({ apiKey })
    } else {
        console.log("API Key not found in environment.")
        res.status(500).json({ error: "API key not found" })
    }
}
