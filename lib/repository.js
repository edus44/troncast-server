'use strict'

const io = require('socket.io-client')
const socket = io('http://127.0.0.1:13370/repository')
const fs = require('fs')
const path = require('path')
const glob = require('glob')
const debug = require('debug')('tc:repository')

let list = []


updateList()
sendList()

socket.on('connect',sendList)
socket.on('remote:request-list',sendList)
socket.on('screen:request-list',sendList)


function updateList(){
    glob(__dirname+'/../channels/*/package.json',(err,files)=>{
        list = []
        files.forEach(file=>{
            try{
                let content = fs.readFileSync(file).toString()
                let packageInfo = JSON.parse(content)
                if (!packageInfo)
                    throw new Error('troncast property not found in package.json')

                let channel = packageInfo.troncast
                let [,folder] = file.match(/(.*)\/package\.json$/)
                channel.entry = 'file://'+path.join(folder,channel.entry)
                channel.preload = channel.preload && path.join(folder,channel.preload)
                channel.version = packageInfo.version
                channel.id = packageInfo.name

                list.push(channel)
            }catch(err){
                debug('Error loading channel '+file,err)
            }
        })
    })
}

function sendList(){
    socket.emit('remote:list',list)
    socket.emit('screen:list',list)
}
