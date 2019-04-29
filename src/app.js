const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()

const port = process.env.PORT || 3000

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)



app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Dan Seidel'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Dan Seidel'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Help is on the way!',
        title: 'Help',
        name: 'Dan Seidel'
    })
})

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Dan', 
//         age: 39
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About Page</h1>')
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error:   "Please search for an address"
        }
            )
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
  
   
        if (error) {
           return res.send({error})
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
           if (error)  {
              return res.send({error})
              
           }
            
           res.send({
               location,
               forecast: forecastData,
               address: req.query.address
           })
           
         })
     })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } 
    console.log(req.query)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('error', {
        message: 'Help article not found', 
        name: 'Dan Seidel'

    })
})

app.get('*', (req, res) => {
    res.render('error', {
        message: '404, page not found', 
        name: 'Dan Seidel'
    })
})


app.listen(port, () => {
    console.log('Server is up on port' + port)
})