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
    return covid.sort((a, b) => new Date(a.date) - new Date(b.date));
}

export { getCovid19 }