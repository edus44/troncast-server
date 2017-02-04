'use strict'

const debug = require('debug')('tc:server:routes')
const express = require('express')
const path = require('path')

module.exports = function(app){
    debug('init')

    //Simpe static serving remote app
    let remotePath = path.resolve(__dirname,'..','troncast-remote','dist')
    debug('remote-path',remotePath)
    app.use('/', express.static(remotePath))

}