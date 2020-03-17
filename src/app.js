const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.port || 3000
const publicDirectoryPath = path.join(__dirname, '../public')
//set a new path for express to lookings for views
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('views', viewPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialPath)


//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req,res)=>{
    res.render('index', {
        title:'WeatherApp',
        name:'Son'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title:'Help',
        name:'Son',
        helptext: 'Google is free, cant find anything here, LOL2'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title:'AboutUs',
        name:'Son'
    })
})

app.get('product', (req, res) => {
    
})

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error : 'address must be provided'
        })
    }

    geocode(req.query.address, (error, {longtitude, lattitude, location} = {} ) => {
        if(error){
            return res.send({
                error: error
            })
        }

        forecast(lattitude, longtitude, (error, {temperature, windspeed})=>{
            return res.send({
                temperature: temperature,
                windspeed: windspeed,
                location: location
            })
        })
    })
})


app.get('/products', (req, res) => {

    if (!req.query.search){
        return res.send({
            error : 'U must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        product : []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page',{
        title:'Help article not found!!',
        name:'Son'
    })
})

//default api for wrong routing(404 error), it must to be at the end at our app like this
//or else this api will excuted before the others
app.get('*', (req,res) => {
    res.render('404page',{
        title:'404page',
        name:'Son'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})