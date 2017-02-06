'use strict'

const port = 13370

//Dependencies
const debug = require('debug')('tc:server')
const express = require('express')
const bonjour = require('bonjour')()
const http = require('http')


debug('init')

//Initializations
const app = express()  
const server = http.createServer(app)  
const io = require('socket.io')(server)

//Socket.io
require('./socket')(io)

//Express
require('./routes')(app)

//Start listening
server.listen(port,()=>{
    debug('listening',port)
    require('./lib/repository')
})

//Publish to net
bonjour.publish({ name: 'Troncast Server', type: 'troncast', port: port })
