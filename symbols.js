import * as http from 'https'

let symbols_map

function send_request(api_key) {
    //console.log(6)
    if (symbols_map) {
        console.log('Returning from map')
        return new Promise((resolve, reject) => {
            resolve(symbols_map)
        })
    }
    //console.log(12)

    var options = {
        "method": "GET",
        "hostname": "api.collectapi.com",
        "port": null,
        "path": "/economy/symbols",
        "headers": {
            "content-type": "application/json",
            "authorization": api_key
        }
    }
    //console.log(24)
    return new Promise((resolve, reject) => {
        console.log('Making a new request')
        let req = http.request(options, res => {
            let chunks = []
            //console.log(28)
            res.on('data', chunk => {
                chunks.push(chunk)
                //console.log(31)
            })

            res.on('end', () => {
                let body = Buffer.concat(chunks)
                body = JSON.parse(body)
                //console.log(37)
                symbols_map = new Map()

                for (let currency of body.result) {
                    symbols_map.set(currency.code, currency.name)
                }
                //console.log(symbols_map)
                resolve(symbols_map)
            })
            //console.log(46)
            res.on('error', e => {
                console.log('Symbols service error')
                reject(e)
            })
        })
        // Never forget request.end()!!
        req.end()

    }).catch(e => console.log('Catched error ' + e))
}

export default { send_request }