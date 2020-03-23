import { countries } from './countries'

const getCovid19 = async () => {
    const response = await fetch('https://europe-west1-covid-19-map-spread.cloudfunctions.net/getCovidData');
    return await response.json(); 
}

const getCovid19Api = async () => {
    const respone = await fetch('https://corona.lmao.ninja/historical');
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
            if (apiCountry.country === 'usa') apiCountry.country = 'United States';
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
    
    return date;
}

export { getCovid19, getCovid19Api }