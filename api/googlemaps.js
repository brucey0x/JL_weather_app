module.exports = (req, res) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY
    if (!apiKey) {
        res.status(500).json({ error: "API key not available" })
        return
    }
    res.json({ apiKey })
}
