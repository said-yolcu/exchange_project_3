const exchange_service = require('./exchange_service.js')
const read_line= require('readline').createInterface({
    input: process.stdin
    , output: process.stdout
})

function serve(service){

}

read_line.question('Which service would you like to use?\n\
Write one of these: exchange, ...', serve)