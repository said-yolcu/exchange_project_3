const exchange_service = require('./exchange_service.js')
const read_line = require('readline').createInterface({
    input: process.stdin
    , output: process.stdout
})

function serve(service) {
    service = service.toString().replace(/\s+|\n/g, '')
    switch (service) {
        case 'exchange':
            // Do case exchange
            function choose_base() {
                read_line.question('Choose your base currency'
                    , base)
                return base
            }
            function choose_to() {
                read_line.question('To which currency would you \
                like to convert ')
                return to
            }
            let base = choose_base()
            let to = choose_to()
            exchange_service.send_request().then(res => console.log(res))
                .catch(e => console.error('Warning! Error: ' + e))
            break
        default:
            console.log('You made an invalid choice')
            choose_service()
    }
}


function choose_service() {
    read_line.question('Which service would you like to use?\n\
Write one of these: exchange, ...', serve)
}