/* global TroncastChannel, window */
/* eslint-disable no-constant-condition */
'use strict'

TroncastChannel.onConfigure(function*(){
    let result
    do{
        result = yield {
            title:'Load url',
            elements:[
                {name:'url'         , label:'Url'          , type:'input'}  ,
                {name:'navigate'    , label:'Navigate'     , type:'button'} ,
                {name:'scrollUp'    , label:'Scroll up'    , type:'button'} ,
                {name:'scrollDown'  , label:'Scroll down'  , type:'button'} ,
                {name:'scrollLeft'  , label:'Scroll left'  , type:'button'} ,
                {name:'scrollRight' , label:'Scroll right' , type:'button'} ,
                {name:'cancel'      , label:'Cancel'       , type:'button'} ,
            ]
        }
        if (result.navigate)
            window.location.href = result.url
        else
        if (result.scrollDown)
            window.scrollTo( window.scrollX, window.scrollY+100)
        else
        if (result.scrollUp)
            window.scrollTo( window.scrollX, window.scrollY-100)
        else
        if (result.scrollLeft)
            window.scrollTo( window.scrollX-100, window.scrollY)
        else
        if (result.scrollRight)
            window.scrollTo( window.scrollX+100, window.scrollY)
    }while(!result.cancel && !result.navigate)
})