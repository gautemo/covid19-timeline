# covid-19-map [![Netlify Status](https://api.netlify.com/api/v1/badges/4f953111-6417-46fb-b8db-86edef562abf/deploy-status)](https://app.netlify.com/sites/covid-19-timeline/deploys) ![Data Source](https://github.com/gautemo/covid19-timeline/workflows/Data%20Source/badge.svg)

Timeline of the spread of COVID-19. 

## Live
[covid-19-timeline.netlify.com](https://covid-19-timeline.netlify.com/)

## Motivation
I wanted to have a visualisation of the spread which also shows the decline in numbers as people recover. But also try some tech!

## TechStack
* Vue 3
* Google Maps API
* Cloud Functions
* Netlify

## Data Source
[disease.sh/](https://disease.sh/)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Cloud Function
The function is just a proxy over the data source to avoid CORS. The source is in the project, but is deployed manually at [GCP console](https://console.cloud.google.com/functions/list?project=covid-19-map-spread) currently.

## Google Maps API
Public API key is restricted to [https://covid-19-timeline.netlify.com/](https://covid-19-timeline.netlify.com/)

For local development, add `VUE_APP_API_KEY=TOKEN` to a `.env.development.local` file with a secret key not restricted to a website.

Tool for styling the map: [mapstyle.withgoogle.com/](https://mapstyle.withgoogle.com/)
