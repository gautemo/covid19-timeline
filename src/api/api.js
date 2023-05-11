import backup from './backupData.json'

const getCovid19 = async () => {
    return convertData(backup);
    // data source: https://disease.sh/covid-19/historical/Afghanistan,Albania,Algeria,Andorra,Angola,Antigua%20and%20Barbuda,Argentina,Armenia,Australia,Austria,Azerbaijan,Bahamas,Bahrain,Bangladesh,Barbados,Belarus,Belgium,Belize,Benin,Bhutan,Bolivia,Bosnia,Botswana,Brazil,Brunei,Bulgaria,Burkina%20Faso,Burma,Burundi,Cabo%20Verde,Cambodia,Cameroon,Canada,Central%20African%20Republic,Chad,Chile,China,Colombia,Comoros,Congo,DRC,Costa%20Rica,C%C3%B4te%20d'Ivoire,Croatia,Cuba,Cyprus,Czechia,Denmark,Djibouti,Dominica,Dominican%20Republic,Ecuador,Egypt,El%20Salvador,Equatorial%20Guinea,Eritrea,Estonia,Swaziland,Ethiopia,Fiji,Finland,France,Gabon,Gambia,Georgia,Germany,Ghana,Greece,Grenada,Guatemala,Guinea,Guinea-Bissau,Guyana,Haiti,Holy%20See,Honduras,Hungary,Iceland,India,Indonesia,Iran,Iraq,Ireland,Israel,Italy,Jamaica,Japan,Jordan,Kazakhstan,Kenya,S.%20Korea,Kosovo,Kuwait,Kyrgyzstan,Lao%20People's%20Democratic%20Republic,Latvia,Lebanon,Lesotho,Liberia,Libyan%20Arab%20Jamahiriya,Liechtenstein,Lithuania,Luxembourg,Madagascar,Malawi,Malaysia,Maldives,Mali,Malta,Marshall%20Islands,Mauritania,Mauritius,Mexico,Micronesia,Moldova,Monaco,Mongolia,Montenegro,Morocco,Mozambique,Namibia,Nepal,Netherlands,New%20Zealand,Nicaragua,Niger,Nigeria,Macedonia,Norway,Oman,Pakistan,Panama,Papua%20New%20Guinea,Paraguay,Peru,Philippines,Poland,Portugal,Qatar,Romania,Russia,Rwanda,Saint%20Kitts%20and%20Nevis,Saint%20Lucia,Saint%20Vincent%20and%20the%20Grenadines,Samoa,San%20Marino,Sao%20Tome%20and%20Principe,Saudi%20Arabia,Senegal,Serbia,Seychelles,Sierra%20Leone,Singapore,Slovakia,Slovenia,Solomon%20Islands,Somalia,South%20Africa,South%20Sudan,Spain,Sri%20Lanka,Sudan,Suriname,Sweden,Switzerland,Syrian%20Arab%20Republic,Taiwan,Tajikistan,Tanzania,Thailand,Timor-Leste,Togo,Trinidad%20and%20Tobago,Tunisia,Turkey,USA,Uganda,Ukraine,UAE,UK,Uruguay,Uzbekistan,Vanuatu,Venezuela,Vietnam,West%20Bank%20and%20Gaza,Yemen,Zambia,Zimbabwe?lastdays=all
    // deprecated cloud function: https://europe-west1-covid-19-map-spread.cloudfunctions.net/getCovidData
}

const convertData = data => {

    const covid = [];
    for (const stats of data) {
        for (let [date, cases] of Object.entries(stats.timeline.cases)) {
            if(cases === 0) continue;
            const countryDayData = { country: stats.country, date, cases, deaths: stats.timeline.deaths[date], recovered: stats.timeline.recovered[date]}
            const day = covid.find(c => c.date === date);
            if (day) {
                day.data.push(countryDayData);
            } else {
                covid.push({
                    date,
                    data: [countryDayData],
                });
            }
        }
    }
    
    const sorted = covid.sort((a, b) => new Date(a.date) - new Date(b.date));
    for(let i = 21; i < sorted.length; i++){
        for(let incident of sorted[i].data){
            const incident21daysAgo = sorted[i-21].data.find(i => i.country === incident.country);
            if (!incident21daysAgo) continue;
            const cases = parseInt(incident21daysAgo.cases) || 0
            const deaths = parseInt(incident21daysAgo.deaths) || 0
            incident.estimateRecovered = cases - deaths
        }
    }
    return sorted
}

export { getCovid19 }