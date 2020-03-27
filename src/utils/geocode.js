const request = require('request');

const geoCode = (location, callback) => {
    const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoiYXZpbGV2YW50IiwiYSI6ImNrODFveWh5cTBoa2czbm1zamlsc2o0ODcifQ.umrwDG_j3lMY2Q8I4zhsYQ`;

    request({ url: geoUrl, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect to service')
        } else if (!body.features) {
            callback('unable to find location')
        } else {

            callback(undefined, {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name


            })
        }
    })
}

module.exports = geoCode