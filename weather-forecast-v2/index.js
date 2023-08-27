const app = require("./server")
const port = 3000
const main = ()=>{
    
    app.listen(port,()=>{
        console.log(`server is listening to port ${port}`)
    })
}
main()