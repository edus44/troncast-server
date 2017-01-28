'use strict'

const debug = require('debug')('tc:server:socket')

// const forwarder = require('./lib/forwarder');
// const channelsManager = require('./lib/channelsManager');

let localIp
require('dns').lookup(require('os').hostname(), (err,addr) => {
    localIp = addr
})

module.exports = function(io){

    io.on('connection',(socket)=>{
        debug('connected',socket.id)
    })

    debug('init')
    /*eslint-disable*/
    return;

    const ns = {
        channel : io.of('/channel'),
        remote : io.of('/remote'),
        screen : io.of('/screen')
    }

    forwarder(ns);

    ///////////
    //SCREEN //
    ///////////
    ns.screen.on('connection',(socket)=>{
        debug('screen connected',socket.id)

        socket.on('getRemoteUri',function(cb){

            cb('http://'+localIp+':13370')
        })
    })

    ///////////
    //REMOTE //
    ///////////
    ns.remote.on('connection',(socket)=>{
        debug('remote connected',socket.id)


        socket.on('getChannels',function(cb){
            cb(channelsManager.getList())
        })

        socket.on('robotCommand',robot.command)
    })

    ////////////
    //CHANNEL //
    ////////////
    ns.channel.on('connection',(socket)=>{
        debug('channel connected',socket.id)
    })
}