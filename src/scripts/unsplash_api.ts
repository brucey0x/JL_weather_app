// Read DOM

type DomElement = HTMLElement | null

const imageElement: DomElement = document.querySelector(".unsplash-image")
const imageLink: DomElement = document.querySelector(".image-link")
const creatorLink: DomElement = document.querySelector(".creator-link")
const creatorElement: DomElement = document.querySelector(".image-creator")

/*
Using Unsplash API!

Documentation: https://unsplash.com/documentation#get-a-random-photo

*/

export async function upgradeBackgroundImage(
    searchQuery: string
): Promise<any> {
    try {
        let apiKey: string = ""
        if (process.env.UNSPLASH_API_KEY) {
            apiKey = process.env.UNSPLASH_API_KEY
        }
        console.log(apiKey)

        const apiEndpoint: string = `https://api.unsplash.com/photos/random?query=${searchQuery}&orientation=landscape&client_id=${apiKey}`

        const response = await fetch(apiEndpoint)
        if (!response.ok) {
            throw new Error("Network error")
        }
        const jsonData = await response.json()
        if (imageElement)
            imageElement.setAttribute("src", jsonData.urls.regular)
        if (imageLink) {
            imageLink?.setAttribute("href", jsonData.links.html)
        }
        if (creatorLink) {
            creatorLink?.setAttribute("href", jsonData.user.links.html)
        }
        if (creatorElement)
            creatorElement.innerText = `Photo by ${jsonData.user.name}.`
        return jsonData
    } catch (error) {
        console.error("There was a problem with the Fetch operation:", error)
        return null
    }

    // fetch(apiEndpoint)
    //     .then((response) => {
    //         if (!response.ok) {
    //             throw new Error("Network error")
    //         }
    //         console.log(response.json)
    //         return response.json()
    //     })
    //     .then((jsonData) => {
    //         if (imageElement)
    //             imageElement.setAttribute("src", jsonData.urls.regular)
    //         if (imageLink) {
    //             imageLink?.setAttribute("href", jsonData.links.html)
    //         }

    //         if (creatorLink) {
    //             creatorLink?.setAttribute("href", jsonData.user.links.html)
    //         }
    //         if (creatorElement)
    //             creatorElement.innerText = `Photo by ${jsonData.user.name}.`
    //     })
    //     .catch((error) => {
    //         console.error(
    //             "There was a problem with the Fetch operation:",
    //             error
    //         )
    //     })
}
