'use strict'

const debug = require('debug')('tc:server:routes')
const express = require('express')

module.exports = function(app){
    debug('init')

    //Simpe static serving remote app
    app.use('/', express.static(__dirname+'/node_modules/troncast-remote/dist'))

}