// Read DOM

const imageElement: HTMLElement | null =
    document.querySelector(".unsplash-image")
const imageLink: HTMLAnchorElement | null =
    document.querySelector(".image-link")
const creatorLink: HTMLAnchorElement | null =
    document.querySelector(".creator-link")
const creatorElement: HTMLElement | null =
    document.querySelector(".image-creator")

/*
Configure Unsplash API!

Documentation: https://unsplash.com/documentation#get-a-random-photo

*/

const query = "surfer"

export function upgradeBackgroundImage(searchQuery: string) {
    const clientID: string = "R3bOh6LdEqwZuKJ1IB_hKqpvNPJJ4MNeMSpI4ziHbpU"
    const apiEndpoint: string = `https://api.unsplash.com/photos/random?query=${searchQuery}&orientation=landscape&client_id=${clientID}`

    fetch(apiEndpoint)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network error")
            }
            console.log(response.json)
            return response.json()
        })
        .then((jsonData) => {
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
        })
        .catch((error) => {
            console.error(
                "There was a problem with the Fetch operation:",
                error
            )
        })
}
