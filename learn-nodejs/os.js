const os = require('os')
const totalMemory = os.totalmem()
const freeMemory = os.freemem()

module.exports.totalMemory = totalMemory
module.exports.freeMemory = freeMemory