import { countries } from './countries'

const toGeo = incident => {
    const country = countries.get(incident.countrycode);
    if(!country){
        //console.error(`Could not find country ${incident.countrycode} ${incident.countrylabel}`);
        return null;
    }

    const total = parseInt(incident.cases) || 0;
    const recovered = parseInt(incident.recovered) || 0;
    const deaths = parseInt(incident.deaths) || 0;

    return {
        type: "Feature",
        properties: {
            mag: total - recovered - deaths,
            place: incident.countrylabel,
        },
        geometry: {
            type: "Point",
            coordinates: [
                country.longitude,
                country.latitude,
            ]
        },
        id: incident.countrycode,
    }
}

export { toGeo }