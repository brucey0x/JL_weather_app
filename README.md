# Intro

Creating a weather app inspired by this tutorial from [Jonah Lawrence](https://www.youtube.com/watch?v=WZNG8UomjSI).

This has been my first time using Typescript and using a local server to build using Typescript.

I'm incorporating the OpenWeather, Google Maps and Unsplash APIs.

## How I've set up the project

-   Initiated `NPM`
-   Added `prettier`, `typescript` and `tsc-watch` as dev dependencies
-   added `git` and `.gitignore`
-   created `/build, /src, /public` structure and added `package.json` with `npm run test, build` scripts that output to `/public, /build` or run tests without emitting files.
-   Configured ./vscode with `launch.json` and `tasks.json` to activate debug functionality within VSC. This was hard!

## How you should set up the project

-   In your CLI, run: `npm init -y`
-   To build, run: `npm run build`
-   To automatically compile based on changes in Typescript (stored in ./src/scripts) and HTML & CSS (stored in ./public/\*) use:

1. `npm run watch-ts`
2. `npm run watch-public`

-   Run a Live Server on `./build/index.html`

## Feature roadmap

### General

-   [x] Get Unsplash image URL to insert in the right element so that the other elements remain visible.

-   [x] Make search query also update the Unsplash API call.

-   [x] Update city text based on API data rather than search query.

-   [x] Limit the search to only searchable cities.

-   [x] Add drop-down to search field to ensure that only cities are selected.

-   [x] Made dropdown selectable by clicking and pressing enter.

-   [ ] Move API key to separate file that's included in `.gitignore`

-   [ ] Filter keys from GH repo that I'd already publicized.

-   [ ] Add serverless API for all possible API calls and test them rigorously.

### Bugs

-   [x] Update temperature on homepage
-   [x] When no image is loaded, there shouldn't be any link on the background image.
