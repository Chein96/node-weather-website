const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=2b8123eecd8f3e7834b0bd7241859fc0&query=${latitude},${longitude}&units=f`;
    request({ url, json: true }, (error, response, body) => {
        if(error){
            callback('Unable to connect to forecast service', undefined);
        } else if(response.body.error) {
            callback('Unable to find location. Please try again.', undefined);
        } else {
            const { weather_descriptions, temperature, feelslike, humidity } = body.current;
            callback(
                undefined, 
                `It is ${weather_descriptions[0]}.
                It is currently ${temperature} degrees out.
                It feels like ${feelslike} degrees out.
                The current humidity is ${humidity}%.`
            );
        }
    });
};

module.exports = forecast;