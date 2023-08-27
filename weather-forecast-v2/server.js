const express = require('express')
const app = express()
const fs = require("fs")
const bodyParser = require("body-parser")
app.use(bodyParser())
const loadDB = ()=>{
    try {
        const dataBuffer = fs.readFileSync("db.json")
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch(e){
        console.error(e)
        return []
    }
}

app.get('/', (req, res) => {
    const data = loadDB()
    res.json(data)
    
})
app.get('/1',(req,res)=>{
    res.json({
        message:'nosdnaosidnaos',
        id:'901u0841028',
        friends:[]    
    })
})
app.post('/',(req,res)=>{
    const data = loadDB()
    data.blogs[0].content = req.body.content
    
     fs.writeFileSync("db.json",JSON.stringify(data))
    res.json(data.blogs)
})













module.exports = app