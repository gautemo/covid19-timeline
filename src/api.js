const getCovid19 = async () => {
    const response = await fetch('https://europe-west1-covid-19-map-spread.cloudfunctions.net/getCovidData');
    return await response.json(); 
}

export { getCovid19 }