import { countries } from './countries'

const getCovid19 = async () => {
    const response = await fetch('https://europe-west1-covid-19-map-spread.cloudfunctions.net/getCovidData');
    const json = await response.json(); 
    
    const covid = [];
    for (const stats of json.data) {
        const day = covid.find(c => c.date === stats.date);
        if(day){
            day.data.push(stats);
        }else{
            covid.push({
                date: stats.date,
                data: [stats],
            });
        }
    }
    return covid.sort((a, b) => new Date(a.date) - new Date(b.date));
}

const getCovid19Api = async () => {
    const respone = await fetch('https://corona.lmao.ninja/v2/historical'); //no longer recovered
    const data = await respone.json();
    
    const covid = []

    for(const [day] of Object.entries(data[0].timeline.cases)){
        covid.push(collectDay(day, data))
    }

    console.log(covid);
    return covid;
}

const collectDay = (day, data) => {
    const date = {
        date: day,
        data: [],
    }

    for(const [key, value] of countries){
        for(const apiCountry of data){
            specialMatch(apiCountry)
            if (value.name.toLowerCase() === apiCountry.country.toLowerCase()){
                const exist = date.data.find(d => d.countrycode === key);
                if(exist){
                    exist.totalcases += parseInt(apiCountry.timeline.cases[day]);
                    exist.totaldeaths += parseInt(apiCountry.timeline.deaths[day]);
                    exist.totalrecovered += parseInt(apiCountry.timeline.recovered[day]);
                }else{
                    date.data.push({
                        countrycode: key,
                        countrylabel: value.name,
                        totalcases: parseInt(apiCountry.timeline.cases[day]),
                        totaldeaths: parseInt(apiCountry.timeline.deaths[day]),
                        totalrecovered: parseInt(apiCountry.timeline.recovered[day]),
                    })
                }
            }
        }
    }

    // for (const apiCountry of data) {
    //     const f = date.data.find(e => e.countrylabel.toLowerCase() === apiCountry.country.toLowerCase());
    //     if(!f) console.log(apiCountry);
    // }
    
    return date;
}

const specialMatch = country => {
    if (country.province === "cayman islands") country.country = "Cayman Islands";
    if (country.province === "montserrat") country.country ="Montserrat";

    const mapper = {
        'uae': 'United Arab Emirates',
        'usa': 'United States',
        'holy see': 'Vatican City',
        'north macedonia': 'Macedonia [FYROM]',
        'korea, south': 'South Korea',
        'congo (kinshasa)': 'Congo [DRC]',
        "cote d'ivoire": `Côte d'Ivoire`,
        'uk': 'United Kingdom',
        'congo (brazzaville)': 'Congo [Republic]',
        'bahamas, the': 'Bahamas',
        'bosnia': 'Bosnia and Herzegovina',
        'taiwan*': 'Taiwan',
        'eswatini': 'Swaziland',
        'gambia, the': 'Gambia',
        'cabo verde': 'Cape Verde',
        'east timor': 'Timor-Leste',
    }
    const match = mapper[country.country];
    if(match) country.country = match  
}

export { getCovid19, getCovid19Api }