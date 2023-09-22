// Read DOM

const imageElement: HTMLElement | null =
    document.querySelector(".unsplash-image")
const imageLink: HTMLElement | null = document.querySelector(".image-link")
const creatorLink: HTMLElement | null = document.querySelector(".creator-link")
const creatorElement: HTMLElement | null =
    document.querySelector(".image-creator")

/*
Configure Unsplash API!

Documentation: https://unsplash.com/documentation#get-a-random-photo

*/

const query = "surfer"

export function upgradeBackgroundImage(searchQuery: string) {
    const clientID: string = "R3bOh6LdEqwZuKJ1IB_hKqpvNPJJ4MNeMSpI4ziHbpU"
    const apiEndpoint: string = `https://api.unsplash.com/photos/random?query=${searchQuery}&client_id=${clientID}`

    fetch(apiEndpoint)
        .then(function (response) {
            console.log(response.json)
            return response.json()
        })
        .then(function (jsonData) {
            if (imageElement)
                imageElement.setAttribute("src", jsonData.urls.regular)
            if (imageLink) imageLink?.setAttribute("href", jsonData.links.html)
            if (creatorLink)
                creatorLink?.setAttribute("href", jsonData.user.links.html)
            if (creatorElement)
                creatorElement.innerText = `Created by ${jsonData.user.name}`
        })

    console.log(`Image is updated with query ${searchQuery}`)
}

// import { createApi } from "unsplash-js"

// const unsplash = createApi({
//     accessKey: "R3bOh6LdEqwZuKJ1IB_hKqpvNPJJ4MNeMSpI4ziHbpU"
//     //...other fetch options
// })

// // non-feed example
// unsplash.photos.get({ photoId: "foo" }).then((result) => {
//     if (result.errors) {
//         // handle error here
//         console.log("error occurred: ", result.errors[0])
//     } else {
//         // handle success here
//         const photo = result.response
//         console.log(photo)
//     }
// })
