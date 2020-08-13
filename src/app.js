const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { geocode, geocodeReverse} = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Miguel Rivera'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me!',
        name: 'Miguel Rivera'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Miguel Rivera',
        message: 'This is a template string'
    });
});

app.get('/weather', (req, res) => {
    const { address } = req.query;

    if(!address){
        return res.send({
            error: 'Address must be provided'
        });
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if(error){
            return res.send({
                error
            });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                });
            }

            return res.send({
                forecast: forecastData,
                location,
                address
            });
        });
    });
});

app.get('/weather/myLocation', (req, res) => {
    const { latitude, longitude } = req.query;

    if(!latitude || !longitude) {
        return res.send({
            error: 'Sorry, could not find your current location.'
        });
    }

    geocodeReverse({ latitude, longitude }, (error, location) => {
        if(error){
            return res.send({
                error
            });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                });
            }

            return res.send({
                forecast: forecastData,
                location
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        errorMessage: 'Help article not found.',
        name: 'Miguel Rivera'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        errorMessage: 'Page not found.',
        name: 'Miguel Rivera'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});