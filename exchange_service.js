import * as http from 'https'
//console.log('B 2')
let exchange_parities = new Map()

function send_request(base, to, api_key) {
    // Make base and to upper cases
    /*
    base = base.toUpperCase()
    to = to.toUpperCase()
    */

    let map_key = `${to}_${base}`
    //console.log('B 5')

    // If the key already exists in the map, return it
    if (exchange_parities.has(map_key)) {
        console.log('Returning the parity from the map')
        return new Promise((resolve, reject) => {
            resolve(exchange_parities.get(map_key))
        })
    }

    // Else request the parity from the api
    var options = {
        "method": "GET",
        "hostname": "api.collectapi.com",
        "port": null,
        "path": `/economy/exchange?int=1&to=${to}&base=${base}`,
        "headers": {
            "content-type": "application/json",
            "authorization": api_key
        }
    }

    return new Promise((resolve, reject) => {
        console.log('Making a new request')
        var req = http.request(options, res => {
            let chunks = []

            //console.log('B 21')
            res.on('data', chunk => {
                chunks.push(chunk)
            })

            //console.log('B 26')
            res.on('end', () => {
                let body = Buffer.concat(chunks)
                body = JSON.parse(body)
                console.log(JSON.stringify(body))
                if (!body['success']) {
                    console.log('Failed response')
                    reject('Failed response')
                }
                body = JSON.stringify(body)
                console.log(body)
                exchange_parities.set(map_key
                    , body
                        .match(/(?<="rate":")(\d.\d+)(?=")/gi))
                resolve(exchange_parities.get(map_key))
                console.log(exchange_parities.get(map_key))
            })

            res.on('error', e => {
                console.log('Exchange service error')
                reject(e)
            })
        })
        req.end()
    })
        .catch(e => console.log('Catched error ' + e))
}

export default { send_request }