
const express = require('express')
const app = express()
const { connectToDb, getDb } = require('./db')
const { ObjectId } = require('mongodb')
const PORT = 3000
const cors = require('cors')
var bodyParser = require('body-parser')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
let db
connectToDb((err) => {
  if (!err) {
    app.listen(PORT, (req, res) => {
      console.log(`This is ${PORT} port `)
    })
    db = getDb()
    
  
  }
})

app.get('/users', (req, res) => {
  // console.log(req)
  // const page = req.query.p || 0
  // const usersPerPage = 2
  let profiles = []
  db.collection('profiles')
    .find()
    // .skip(page * usersPerPage)
    // .limit(usersPerPage)
    .forEach(profile => profiles.push(profile))
    .then(() => {
      res.status(200).json(profiles)
    })
    .catch(() => {
      res.status(500).json({ error: "could not fetch data" })
    })
})
app.get('/users/:id', (req, res) => {
  console.log(req.params.id)
  if (ObjectId.isValid(req.params.id)) {

    db.collection('profiles')
      .findOne({ _id: ObjectId(req.params.id) })


      .then((doc) => {
        res.status(200).json(doc)
      })
      .catch(err => {
        res.status(500).json({ error: 'Cound not fetch data' })
      })
  }
})

app.use(bodyParser.json())
app.post('/users', (req, res) => {
  console.log(req.body)
  db.collection('profiles')
    .insertOne(req.body)
    .then(result => {
      res.status(201).json(result)
    })
    .catch(err => {
      res.status(500).json({ error: 'Cound not post data' })
    })
})
app.delete('/users/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)) {

    db.collection('profiles')
      .deleteOne({ _id: ObjectId(req.params.id) })
      .then((result) => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({ error: 'Cound not fetch data' })
      })
  }
})  
app.patch('/users/:id', (req, res) => {
  const update = req.body
  console.log(update)
  db.collection('profiles')
    .updateOne({ _id: ObjectId(req.params.id) },
      { $set: update }
    )
    .then(res => {
      res.status(200).json(res)
    })
    .catch(err => {
      res.status(500).json({ error: 'Cound not update data' })  
    })
})
app.get('/profile', (req,res) => {
  // console.log(req.query.name)
  // res.json(req.query.name)
  db.collection('profiles')
  .find({
    
    age:JSON.stringify(req.query.age) 
  })
  .then(doc => {
    console.log(doc)
    res.status(200).json(doc)
  })
  .catch(err => {
    res.status(500).json("got error!")
  })
})