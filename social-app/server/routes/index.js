const authRouter =  require('./auth')
function route(app) {
 
    app.use('/users', authRouter)
}

module.exports = route