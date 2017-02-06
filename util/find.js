'use strict'

const bonjour = require('bonjour')()

bonjour.find({type:'troncast'},service=>{
    let ips = service.addresses.filter(x=>!~x.indexOf(':'))
    console.log('Found:',service.host,ips,service.port)
})