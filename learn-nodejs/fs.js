const fs = require('fs')
// const files = fs.readdirSync('./')
// console.log(files)
const http = require('http')

http.createServer((req,res ) => {
    fs.readFile('./index.html', (err,data) => {
        res.writeHead(200,{'Content-Type':'text/html'})
        res.write(data)
        res.write('hello')
        return res.end()
    }) 
}).listen(8000)
fs.readdir('./',(err,files) => {
    if(err) console.log("ERR!!")
    else console.log(files)
})
fs.appendFile('newFile/newFileText2.text','Hello Content 2!' , (err) => {
    if (err) throw err
    console.log("Created!")
})
fs.appendFile('newFile/newFileText2.text','Add new content!', (err) => {
    if(err) throw err
    console.log('Add new content!')
})
fs.writeFile('newFile/newFileText2.text','Update new content',(err)=>{
    if (err) throw err
    console.log("Updated!")
})
fs.unlink('newFileText2.txt', (err) => {
    if(err) throw err 
    console.log("Deleted!")
})
fs.appendFile('newFileText2.txt', 'This is new File text 2', (err) => {
    if(err) throw err 
    console.log("added!")
})
fs.rename('newFileText1.txt', 'newFileText111.txt', (err) => {
    if(err)throw err 
    console.log("Renamed!")
})