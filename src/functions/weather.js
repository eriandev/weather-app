require('dotenv').config();
const axios = require('axios');

let weatherInfo;

exports.handler = async(event, context, callback) => {

    const {mode, lat, lon} = event.queryStringParameters;

    const callbackHeaders = {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Headers': 'Content-Type'
    }

    await axios.get(`http://api.openweathermap.org/data/2.5/${mode}?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.OPENWEATHER_KEY}`)
        .then(res => {
            weatherInfo = res.data
        }).catch( err => {console.log(err)});

    callback(null, {
        statusCode: 200,
        headers: callbackHeaders,
        body: JSON.stringify({ ...weatherInfo })
    });
}
