const http = require('http')

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('hello world')

    }
    if (req.url === '/users') {
        res.write(JSON.stringify({
            name: 'Ha kHoa',
            age: '17'
        }))
 
    }
    return res.end()
})
server.listen(3000)
server.on("connection", (socket) => {
    console.log('new connection...')
}) 
