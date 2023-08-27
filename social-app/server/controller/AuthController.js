const db = require('../index')


class AuthController {
    signup(req, res) {

        console.log(req.body)
        db.collection('users')
            .insertOne(req.body.newUser)
            .then(() => {
                sendEmail(req.body.newUser.email, req.body.verifyCode)
            })

    }
    login(req, res) {
        db.collection('users')
            .find().toArray()
            .then(doc => {
                res.status(200).json(doc)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

}
module.exports = new AuthController