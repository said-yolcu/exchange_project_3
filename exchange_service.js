var http = require('https')

function send_request(base, to) {
    var options = {
        'method': 'GET'
        , 'hostname': 'api.collectapi.com'
        , 'port': null
        , 'path': `/economy/exchange?int=1&to=${to}&base=${base}`
    }

    return new Promise((resolve,reject) => {
        var req = http.request(options, res => {
            let chunks = []
    
            res.on('data', chunk => {
                chunks.push(chunk)
            })
    
            res.on('end', () => {
                let body = Buffer.concat(chunks)
                resolve(body.toString())
            })

            res.on('error', e => reject(e))
        })
    }).finally(() => req.end())

}

module.exports = { send_request }