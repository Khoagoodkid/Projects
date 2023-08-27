import {initializeApp} from 'firebase/app'
import {collection,getFirestore,getDoc} from 'firebase/firestore'

const express = require('express')
const app = express()
var cors = require('cors');
app.use(cors());
const port = 3000
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.post('/api/users',(req,res)=>{
  console.log(req.body)
  return res.json(
    req.body
  
  )

})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})