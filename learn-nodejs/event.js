const EventEmitter = require('events')
const emitter = new EventEmitter()
// emitter.emit('MessageLogged', {
//     id:1, 
//     name:'Khoa ha',
//     age:'17'
// })
module.exports.emmiter = emitter
const Logger = require('./logger')
const logger = new Logger()
logger.on('sendMsg', (msg) => {
    console.log('Listener Called!')
    console.log(msg)
})
logger.log('New msg iz coming')