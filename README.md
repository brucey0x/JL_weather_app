# Intro

Creating a weather app following this tutorial from [Jonah Lawrence](https://www.youtube.com/watch?v=WZNG8UomjSI).

I'm going to use Typescript for the first time and try some basic typing.

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

## Todos

-   [] Get Unsplash
