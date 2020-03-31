const path = require('path')
const express = require('express');
const hbs = require('hbs')
const app = express();
const geoCode = require('./utils/geocode');
const weather = require('./utils/weather')

//define express paths
const publicDirPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//set location using handlebars
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//set up static directory
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'WEATHER',
        name: 'avi levant'
    })
});


app.get('/help', (req, res) => {
    res.render('help', {
        message: "help, i need somebody",
        title: 'HELP SECTION',
        name: 'avi levant'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "ABOUT ME",
        name: 'avi levant'
    })
});

const weatherCBBuilder = (context) => {
    let location = context.location;
    let latitude = context.latitude;
    let longtitude = context.longtitude;
    let res = context.res;
    let address = context.address

    return (error, weatherData = '') => {

        if (error !== null) {
            return res.send({ error })
        }

        res.send({
            location,
            forecast: weatherData,
            address: address
        })

    }
}

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No Address Given, please provide an Address'
        })
    }

    geoCode(req.query.address, (error, { latitude, longtitude, location } = {}) => {
        console.log('check start', error, { latitude, longtitude, location })
        if (error) {
            return res.send({ error })
        }


        let context = {
            location: location,
            latitude: latitude,
            longtitude: longtitude,
            res: res,
            address: req.query.address
        };



        weather(latitude, longtitude, weatherCBBuilder(context))
    })

})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "wrong way",
        message: 'help article not found',
        name: 'Avi Levant'

    })
});

app.get('*', (req, res) => {
    res.render('404', {
        message: 'page not found',
        title: '404',
        name: 'Avi Levant'

    })
});


app.listen(3000, () => {
    console.log('server is working on port 3000')
});