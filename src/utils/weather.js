const request = require('request');
const geoCode = require('./geocode')


const Weather = (latitude, longtitude, callback) => {


    const url = `https://api.darksky.net/forecast/8d648d8d00ef36a092053a8ac01e352e/${latitude},${longtitude}?units=si`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect to wether service')
                //callback('unable to connect to wether service', null)
        } else if (body.error) {

            callback('unable to find location', null)
        } else {

            callback(null, `${body.daily.data[0].summary} it is currently ${Math.floor(body.currently.temperature)} deg outside, and there is  ${body.currently.precipProbability}% chance of rain`)
        }
    });
}




module.exports = Weather;