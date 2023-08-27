const EventEmitter = require('events')


class Logger extends EventEmitter {

    log = (message) => {
        // console.log(message)
        this.emit('sendMsg', message)
    }
}
console.log(__filename)
console.log(__dirname)
const student = {
    name: 'Khoa ha',
    age: 15,
    subject: 'computer science'
}
module.exports = Logger

// const path = require('path')
// const pathObj = path.parse(__filename)
// console.log(pathObj)