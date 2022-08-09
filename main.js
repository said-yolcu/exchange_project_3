import exchange_service from './exchange_service.js'
import rl from 'readline-promise'
const readline = rl.default
const read_line = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
})
import { api_key } from './api_key.js'

async function serve(service) {
    service = service.toString().replace(/\s+|\n/g, '')
    switch (service) {
        case 'exchange':
            // Do case exchange
            /*
            function choose_base() {
                return new Promise((resolve, reject)=>{
                    resolve(read_line.question('Choose your base currency'))
                })
            }
            function choose_to(base) {
                return new Promise((resolve, reject)=>{
                    resolve(read_line.question('Choose your to currency'))
                })
            }
            */
            console.log(27)
            let base = await read_line.questionAsync('Choose your base')
            console.log(29)
            let to = await read_line.questionAsync('Choose your to')
            console.log(31)
            let amount = await read_line.questionAsync('Enter the amount')
            amount = Number(amount)

            function inform_user(rate) {
                rate = Number(rate)
                console.log(`The exchange rate is ${rate}.
And the ${amount} ${base} is equivalent to ${amount * rate}`)
            }

            exchange_service
                .send_request(base, to, api_key)
                .then(inform_user)
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

choose_service()