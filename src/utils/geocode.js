const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiY2hlaW45NiIsImEiOiJjamw4aGVtcnozajc2M3JxdHBjbnljanFxIn0.4bRcnA-BVNq9VL_kYLZdNQ&limit=1`;
    request({ url, json: true }, (error, response, body) => {
        if(error){
            callback('Unable to connect to location services!', undefined);
        } else if(body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            const { place_name: location, center } = body.features[0];
            const [ longitude, latitude ] = center;

            callback(undefined, { latitude, longitude, location });
        }
    });
};

const geocodeReverse = ({ latitude, longitude }, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoiY2hlaW45NiIsImEiOiJjamw4aGVtcnozajc2M3JxdHBjbnljanFxIn0.4bRcnA-BVNq9VL_kYLZdNQ&limit=1`;
    request({ url, json: true }, (error, response, body) => {
        if(error){
            callback('Unable to connect to location services!', undefined);
        } else if(body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            const { place_name: location } = body.features[0];

            callback(undefined, location);
        }
    });
};

module.exports = {
    geocode,
    geocodeReverse
};