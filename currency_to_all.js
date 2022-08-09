import * as http from 'https'

let currencies_to_all = new Map()

function send_request(base, api_key) {

    if (currencies_to_all.has(base)) {
        console.log('Returning from map ')
        return new Promise((resolve, reject) => {
            resolve(currencies_to_all.get(base))
        })
    }

    var options = {
        "method": "GET",
        "hostname": "api.collectapi.com",
        "port": null,
        "path": `/economy/currencyToAll?int=10&base=${base}`,
        "headers": {
            "content-type": "application/json",
            "authorization": api_key
        }
    }

    return new Promise((resolve, reject) => {
        console.log('Making a new request')
        let req = http.request(options, res => {
            var chunks = []

            res.on('data', chunk => {
                chunks.push(chunk)
            })

            res.on('end', () => {
                let based_map = new Map()

                let body = Buffer.concat(chunks)
                body = JSON.parse(body)

                for (let currency of body.result.data) {
                    based_map.set(currency.code, currency.rate)
                }
                currencies_to_all.set(base, based_map)
                // console.log(currencies_to_all.get(base))
                resolve(currencies_to_all.get(base))
            })

            res.on('error', e => {
                console.log('Currency to all service error')
                reject(e)
            })
        })

        req.end()
    })
}

export default { send_request }