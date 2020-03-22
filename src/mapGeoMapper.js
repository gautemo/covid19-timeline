import { countries } from './countries'

const toGeo = incident => {
    const country = countries.get(incident.countrycode);
    if(!country){
        //console.error(`Could not find country ${incident.countrycode} ${incident.countrylabel}`);
        return null;
    }

    const totalNow = parseInt(incident.totalcases) - parseInt(incident.totalrecovered);
    if(isNaN(totalNow)){
        return null;
    }

    return {
        type: "Feature",
        properties: {
            mag: totalNow,
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