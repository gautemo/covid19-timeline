import backup from '@/api/backupData.json'

const getCovid19 = async () => {
    try{
        const response = await fetch('https://europe-west1-covid-19-map-spread.cloudfunctions.net/getCovidData');
        const json = await response.json(); 
        return convertData(json.data);
    }catch{
        console.log('using backupdata');
        return convertData(backup.data);
    }
}

const convertData = data => {
    // add estimated recovered here instead
    const covid = [];
    for (const stats of data) {
        const day = covid.find(c => c.date === stats.date);
        if (day) {
            day.data.push(stats);
        } else {
            covid.push({
                date: stats.date,
                data: [stats],
            });
        }
    }
    const sorted = covid.sort((a, b) => new Date(a.date) - new Date(b.date));
    for(let i = 21; i < sorted.length; i++){
        for(let incident of sorted[i].data){
            const incident21daysAgo = sorted[i-21].data.find(i => i.countrycode === incident.countrycode);
            if (!incident21daysAgo) continue;
            const cases = parseInt(incident21daysAgo.cases) || 0
            const deaths = parseInt(incident21daysAgo.deaths) || 0
            incident.estimateRecovered = cases - deaths
        }
    }
    return sorted
}

export { getCovid19 }