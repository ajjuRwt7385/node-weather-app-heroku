const express = require('express');
const path = require('path');
const chalk = require('chalk');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const getWeather = require('./utils/weather');

const app = express();

const PORT = process.env.PORT || 7385;
const publicDirPath = path.join(__dirname, '../public');
const viewsDirPath = path.join(__dirname, '../templates/views');
const hbsPartialsDirPath = path.join(__dirname, '../templates/partials');

// setup directory to serve static files--- 
app.use(express.static(publicDirPath));

// setup dynamic view template engine hbs for express (which uses handlebars)---
/**
 * to setup `view engine` should be exactly the same stirng and also 
 * at the root of the project we need to have a `views` (default) directory for all our `.hbs` template files.
 * to update the `views` directory to some custom path say `templates/views` we need to do folloing setup
 * REF: `http://expressjs.com/en/4x/api.html#app.set`
 */
app.set('views', viewsDirPath);
app.set('view engine', 'hbs');

// Setting hbs to use the partials---
hbs.registerPartials(hbsPartialsDirPath);

const author = {
    name: 'Ajay Rawat'
}

// setup routs to serve `hbs` templates---
app.get('', (req, res) => {
    res.render('index', {
        pageTitle: 'HomePage',
        title: 'Weather App!',
        name: author.name,
        active: { active_home: true },
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: 'About Page',
        title: 'About me!',
        name: author.name,
        active: { active_about: true },
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        pageTitle: 'Help Page',
        title: 'Help!',
        name: author.name,
        active: { active_help: true },
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404, Help article not found!',
        name: author.name
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: 'location is mandatory parameter.'
        })
    }
    geocode(req.query.location, (data) => {
        if (data.error) {
            res.send({
                error: data.error
            })
        } else {
            getWeather(data.lat, data.lng, data.place, (weatherData) => {
                if (weatherData.error) {
                    res.send({
                        error: weatherData.error
                    })
                } else {
                    res.send({
                        ...weatherData
                    })
                }
            });            
        }
    });
    
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404, Page not found!',
        name: author.name
    })
})

app.listen(PORT, () => {
    console.log(chalk.bgGreen(`Server listening to port ${PORT}`));
})