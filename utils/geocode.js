const request = require('request')

const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibG9saXRzYWxlIiwiYSI6ImNrN2MzdWV0eTFheTUzZW51eWZoZ3dxcDYifQ.4mWv06KEZ9Ae_nBaNG5VcQ'
    
    request( {url: url, json: true}, (err, {body})=> {
        if(err){
            callback('Unable to connect to location services!',undefined)
        }else if(body.features.length === 0) {
            callback('Unable to find location, try another search.',undefined)
        }else{
            const longtitude = body.features[0].center[0]
            const lattitude = body.features[0].center[1]
            const location = body.features[0].place_name

            const data = {
                longtitude,
                lattitude,
                location
            }
            
            callback(undefined,data)
        }   
    })
}

module.exports = geocode