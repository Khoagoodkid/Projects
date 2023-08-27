require('dotenv').config()
const nodemailer = require('nodemailer')
const express = require('express')
const app = express()
const cors = require('cors')
const { connectToDb, getDb } = require('./db')
const bodyParser = require('body-parser')
const PORT = 3000
// const route = require('./routes')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
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
let trueVeriCode = false
app.post('/code', (req,res) => {
  sendEmail(req.body.newUser.email, req.body.verifyCode)
})

app.post('/users', (req, res) => {
 


    db.collection('users')
        .insertOne(req.body.newUser)
        .then(() => {
         
        })

})
app.get('/users', (req, res) => {
  db.collection('users')
      .find().toArray()
      .then(doc => {
          res.status(200).json(doc)
      })
      .catch(err => {
          res.status(500).json(err)
      })
})

const sendEmail = async (email,verifyCode) => {
  let transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
      user: 'haphamanhkhoa@gmail.com', // generated ethereal user
      pass: process.env.AUTH_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
   await transporter.sendMail({
    from: 'haphamanhkhoa@gmail.com', // sender address
    to: "hakhoa170805@gmail.com", // list of receivers
    subject: "Verify your account", // Subject line
    text: "Hello world?", // plain text body
    html: `<b>${verifyCode}</b>`, // html body
  });
}
// app.listen(PORT, () => {
//     console.log("Server is running on port", PORT)
// }) 

module.exports = db