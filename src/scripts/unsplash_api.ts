// Read DOM

const imageElement: any = document.querySelector(".unsplash-image")
const imageLink = document.querySelector(".image-link")
const creatorElement = document.querySelector(".image-creator")

/*
Configure Unsplash API

Documentation: https://unsplash.com/documentation#get-a-random-photo

I got rate limited so need to try again.

*/

const clientID = "R3bOh6LdEqwZuKJ1IB_hKqpvNPJJ4MNeMSpI4ziHbpU"

const query = "surfer"

const endpoint = `https://api.unsplash.com/photos/random?query=${query}&client_id=${clientID}`

fetch(endpoint)
    .then(function (response) {
        console.log(response.json)
        return response.json()
    })
    .then(function (jsonData) {
        imageElement.src = jsonData.urls.regular
    })

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
