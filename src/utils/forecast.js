const request = require('request')
const forecast = (latitude, longitude, callback) => {
    
    const url = 'https://api.darksky.net/forecast/d490d4f617598510b321abee38c71f1c/' + latitude + ',' + longitude

    request({ url, json: true }, (error, {body}) => {
        if (error) {
       callback('Unable to connect!')
    }  else if (body.error) {
       callback('Unable to find that location')
    }
        else {
        callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain. The high temperature will be ' + body.daily.data[0].temperatureHigh)
    }
   })
}



module.exports = forecast