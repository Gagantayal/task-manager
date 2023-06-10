const express = require("express")
const UserRouter = require('./routers/user')
const TaskRouter = require('./routers/task')

require('./db/mongoose')

const app = express()
const port = process.env.PORT

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


// jwt


// const jwt = require('jsonwebtoken')
// const myFunction = async()=>{
//     const token = jwt.sign({_id:'123'},'hcdgr',{expiresIn:'2 weeks'})
//     console.log(token)
//     const data = jwt.verify(token,'hcdgr')
//     console.log(data)
// }
// myFunction()

app.listen(port,()=>{
    console.log('server is  up on port ' + port)
})

// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async () => {
//     //const task = await Task.findById('647c82b8d58b036e16e235b9').populate('owner');
//    // await task.populate('owner').execPopulate(); 
//     //console.log(task)

//     // const user = await User.findById('647d768b268c05d2695414cf').populate('tasks')
//     // await user.populate('tasks').execPopulate()
//   //   console.log(user.tasks)
// }

// main()

// const multer = require('multer')
// const upload = multer({
//     dest: 'images'
// })
// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// })