require('dotenv').config();
const axios = require('axios');

let ipInfo;

exports.handler = async(event, context, callback) => {

    const ipClient = event.headers['client-ip'];

    const callbackHeaders = {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Headers': 'Content-Type'
    }

    await axios.get(`https://ipinfo.io/${ipClient}?token=${process.env.IPINFO_KEY}`)
        .then(res => {
            ipInfo = res.data
        }).catch( err => {console.log(err)});

    callback(null, {
        statusCode: 200,
        headers: callbackHeaders,
        body: JSON.stringify({ ...ipInfo })
    });
}
