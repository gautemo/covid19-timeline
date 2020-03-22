import { countries } from './countries'

const toGeo = incident => {
    const country = countries.get(incident.countrycode);
    if(!country){
        //console.error(`Could not find country ${incident.countrycode} ${incident.countrylabel}`);
        return null;
    }

    const total = parseInt(incident.totalcases) || 0;
    const recovered = parseInt(incident.totalrecovered) || 0;

    return {
        type: "Feature",
        properties: {
            mag: total - recovered,
            place: incident.countrylabel,
            url: "https://thevirustracker.com/timeline/map-data.json",
        },
        geometry: {
            type: "Point",
            coordinates: [
                country.longitude,
                country.latitude,
            ]
        },
        id: incident.countrycode
    }
}

export { toGeo }