const fetch = require('node-fetch');

exports.getCovid19 = async (req, res) => {
    res.set('Access-Control-Allow-Origin', "*");
    res.set('Access-Control-Allow-Methods', 'GET');
    const response = await fetch('https://thevirustracker.com/timeline/map-data.json');
    const data = await response.json();
    res.status(200).send(data);
};
