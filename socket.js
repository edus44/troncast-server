'use strict'

const debug = require('debug')('tc:server:socket')

const forwarder = require('./lib/forwarder')

module.exports = function(io){

    debug('init')

    const ns = {
        repository : io.of('/repository'),
        remote : io.of('/remote'),
        channel : io.of('/channel'),
        screen : io.of('/screen')
    }

    forwarder(ns)

    ns.screen.on('connection',(socket)=>{
        debug('screen connected',socket.id)
    })

    ns.remote.on('connection',(socket)=>{
        debug('remote connected',socket.id)
    })

    ns.repository.on('connection',(socket)=>{
        debug('repository connected',socket.id)
    })

    ns.channel.on('connection',(socket)=>{
        debug('channel connected',socket.id)
    })
}