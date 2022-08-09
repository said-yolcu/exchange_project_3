import exchange_service from './exchange_service.js'
import currency_to_all from './currency_to_all.js'
import symbols from './symbols.js'

import rl from 'readline-promise'
const readline = rl.default
const read_line = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
})
import { api_key } from './api_key.js'

async function serve(service) {

    service = service.toString().replace(/\s+/g, '').toLowerCase()
    want_to_quit(service)

    async function choose_base() {
        let base = await read_line.questionAsync('Choose your base: ')
        want_to_quit(base)
        // We will trim and change to uppercase here
        base = base.trim().toUpperCase()
        return base
    }

    async function choose_to() {
        let to = await read_line.questionAsync('Choose your to: ')
        want_to_quit(to)
        to = to.trim().toUpperCase()
        return to
    }

    async function choose_amount() {
        let amount = await read_line.questionAsync('Enter the amount: ')
        want_to_quit(amount)
        amount = amount.trim()
        return amount
    }

    switch (service) {
        case 'exchange': {

            //console.log(27)
            let base = await choose_base()
            //console.log(29)
            let to = await choose_to()
            //console.log(31)
            let amount = await choose_amount()
            amount = Number(amount)

            function inform_user(rate) {
                rate = Number(rate)
                console.log(`The exchange rate is ${rate}.
And the ${amount} ${base} is equivalent to ${amount * rate} ${to}`)
            }

            exchange_service
                .send_request(base, to, api_key)
                .then(inform_user)
                .then(choose_service)
                .catch(e => console.error('Warning! Error: ' + e))
        } break;

        case 'currencytoall': {

            let base = await choose_base()

            function inform_user(based_map) {
                for (let [key, value] of based_map.entries()) {
                    console.log(`1 ${base} is ${value} ${key}`)
                }
            }

            currency_to_all
                .send_request(base, api_key)
                .then(inform_user)
                .then(choose_service)
                .catch(e => console.error('Warning! Error: ' + e))
        } break;

        case 'symbols': {

            function inform_user(symbols_map) {
                console.log(symbols_map)
            }

            symbols
                .send_request(api_key)
                .then(inform_user)
                .then(choose_service)
                .catch(e => console.error('Warning! Error: ' + e))
        } break;

        default:
            console.log('You made an invalid choice')
            choose_service()
    }
}

function want_to_quit(word) {
    if (word.toLowerCase().trim() === 'quit') {
        console.log('You chose to quit. Bye bye!')
        read_line.close()
        process.exit()
    }
}

function choose_service() {
    read_line.question('Which service would you like to use?\n\
Write one of these: exchange, currency to all, symbols ...\n\
If you want to quit, type quit any time ', serve)
}


choose_service()