const request = require('request')

const forecast = (lattitude, longtitude, callback)=>{
    const url = 'https://api.darksky.net/forecast/7ef95690854bc7198b717b87ac40364f/'+ encodeURIComponent(lattitude) +','+ encodeURIComponent(longtitude)

    request({url: url, json: true}, (err, res)=> {
        if(err){
            callback('Unable to connect to forecast services!', undefined)
        }else if(res.body.error) {
            callback(res.body.error,undefined)
        }else{
            const data = {
                temperature: res.body.currently.temperature,
                windspeed: res.body.currently.windSpeed
            }
            callback(undefined,data)
        }   
    })
}

module.exports = forecast
