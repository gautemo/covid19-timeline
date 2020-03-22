# covid-19-map
Timeline of the spread of COVID-19. 

[![Netlify Status](https://api.netlify.com/api/v1/badges/4f953111-6417-46fb-b8db-86edef562abf/deploy-status)](https://app.netlify.com/sites/covid-19-timeline/deploys)
[covid-19-timeline.netlify.com](https://covid-19-timeline.netlify.com/)

## Motivation
I wanted to have a visualisation of the spread which also shows the decline in numbers as people recover. But also try some tech!

## TechStack
* Vue 3
* Google Maps API
* Cloud Functions
* Netlify

## Data Source
[thevirustracker.com/](https://thevirustracker.com/)

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
The function is just a proxy over the data source to avoid CORS. The source is in the project, but is deployed manually currently.

## Google Maps API
Public API key is restricted to [https://covid-19-timeline.netlify.com/](https://covid-19-timeline.netlify.com/)

For local development, add `VUE_APP_API_KEY=TOKEN` to a `.env.local` file with a secret key not restricted to a website.
