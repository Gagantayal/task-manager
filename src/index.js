const express = require("express")
const UserRouter = require('./routers/user')
const TaskRouter = require('./routers/task')
require('./db/mongoose')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(UserRouter)
app.use(TaskRouter)

// const router = new express.Router()
// router.get('/test',(req,res)=>{
//     res.send("success")
// })
// app.use(router)


// BCRYPT

// const b = require('bcrypt')
// const myFunction = async()=>{
//     const pass = "red12345!"
//     const hashpass = await b.hash(pass,10)
//     console.log(pass)
//     console.log(hashpass)

//     const isMatch = await b.compare(pass,hashpass)
//     console.log(isMatch)
// }
// myFunction();

app.listen(port,()=>{
    console.log('server is  up on port ' + port)
})