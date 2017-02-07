'use strict'

const debug = require('debug')('tc:server:socket:forwarder')

module.exports = function(ns){

    //Iterate over all NS
    for(let nsOf in ns){
        ns[nsOf].on('connection',(socket)=>{

            //Workarround to listen to every message
            let onevent = socket.onevent
            socket.onevent = function(packet){
                
                // Proxy to original call
                onevent.call(this, packet)    
                
                //Clone packet data
                let args = Array.from(packet.data || [])

                //Looks for the destiny NS
                let event = args.shift().split(':')

                //If ns exists
                if (event.length > 1 && ns[event[0]]){

                    //Destiny NS
                    let nsTo = event[0]

                    //Standalone name of event 
                    let eventName = event[1]

                    debug('['+nsOf+' > '+nsTo+']',eventName,args)

                    //Change the eventName to contain the emitter ns
                    let forwardedEventName = nsOf + ':' + eventName

                    //Prepends to arguments
                    args.unshift(forwardedEventName)

                    //Emit the event to the destiny NS
                    ns[nsTo].emit.apply(ns[nsTo],args)
                }else{
                    debug('['+nsOf+' > MAIN]',event[0],args)
                }
            }
        })
    }

}