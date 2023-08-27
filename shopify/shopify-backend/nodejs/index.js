const express = require("express")
const app =express()
const {connectToDb,getDb} = require('./db')
const PORT = 3000
const products = require("./api")
const cors = require("cors")
const {ObjectId} = require('mongodb')
app.use(cors())


var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())  


let db
connectToDb((err) => {
  if (!err) {
    app.listen(PORT, (req, res) => {
      console.log(`This is ${PORT} port `)
    })
    db = getDb()
    
  
  }
})


function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

// products.map(p => {
//     db.collection("products")
//     .insertOne({...p, 
//         rating:((Math.random() *(5-3)+ 3)).toFixed(1),
//         sellingTimes:(Math.floor((Math.random() *(200-1)+ 1))),
//         created_at:randomDate(new Date(2022,0,1), new Date())
//     })
 
   

        
// })

app.get('/products', (req,res) => {
    let products = []
    db.collection("products")
    .find()
    .forEach(product => {
        products.push(product)
    })
    .then(() => {
        res.status(200).json(products)
    })
    .catch(err => res.status(500).json("Error!"))
})
app.get('/products/:category', (req,res) => {
  console.log(req.params.category)
  let products = []

    db.collection("products")
    .find({'category.name': req.params.category})
    .forEach(product => products.push(product))
    .then(() => {
      res.status(200).json(products)

    })
    .catch(err => res.status(500).json("Error!"))
})
app.get('/product/:id', (req,res) => {
  let products = []

  db.collection("products")
  .findOne({_id:ObjectId(req.params.id)})
  .then((product) => {
    res.status(200).json(product)

  })
  .catch(err => res.status(500).json("Error!"))
 
})
app.post('/bills',(req,res) => {
  db.collection("bills")
  .insertOne(req.body)
})
app.post('/comments',(req,res) => {
  // console.log(req.body)
  db.collection("comments")
  .insertOne(req.body)
})
app.get('/comments/:productId', (req,res) => {
  let comments = []
  db.collection('comments')
  .find({productId: req.params.productId})
  .forEach(comment => comments.push(comment))
  .then(() => res.status(200).json(comments))
  .catch(err => res.status(500).json("Error!"))
})
app.delete('/comments/:id', (req,res) => [
  db.collection("comments")
  .deleteOne({_id: ObjectId(req.params.id)})
])
app.patch('/product/selling-times/:id', (req,res) => {
  console.log(req.body.increment)
  db.collection("products")
  .updateOne({
    _id:ObjectId(req.params.id)
  }, {
    $set:{sellingTimes: req.body.increment}
  })
})
app.get('/bills/:userId',(req,res)=> {
  let bills = []
  console.log(req.params.userId)
  db.collection("bills")
  .find({userId: parseInt(req.params.userId)})
  .forEach(bill => bills.push(bill))
  .then(() => {
    res.status(200).json(bills)
  })
  .catch(err => {
    res.status(500).json("Error!")
  })
})
app.delete('/bills/:id', (req,res) => {
  db.collection("bills")
  .deleteOne({_id: ObjectId(req.params.id)})
})
app.post('/cart', (req,res) => {
  
  db.collection("cart")
  .insertOne(req.body)
})
app.get('/cart/:userId',(req,res) => {
  let products = []
  db.collection("cart")
  .find({userId: parseInt(req.params.userId)})
  .forEach(product => products.push(product) )
  .then(() => res.status(200).json(products))
  .catch(() => res.status(500).json("error!"))
})
app.delete('/cart/:id', (req,res) => {
  db.collection("cart")
  .deleteOne({_id: ObjectId(req.params.id)})
})