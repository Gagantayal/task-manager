const express = require("express")
const User = require('./models/user')
const Task = require('./models/task')
require('./db/mongoose')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/user',async (req,res)=>{
    const user = new User(req.body)
    try{
    await user.save()
    res.status(201).send(user)
    }
    catch(e){
        res.status(400).send(e)  
    }

    // user.save().then(()=>{
    //     res.status(201).send(user)
    //     console.log(user)
    // }).catch((e)=>{
    //     res.status(400).send(e)
    // }
    // )
})

app.get('/user', async(req,res)=>{
    try{
        const users = await User.find({})
        res.send(users) 
    }
    catch(e){
        res.status(500).send()
    }

    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})
app.get('/user/:id',async(req,res)=>{
    const _id = req.params.id
    try{
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send()
            }
            res.send(user)
    }
    catch(e){
        res.status(500).send()
    }

    // const _id = req.params.id
    // console.log(_id)
    // User.findById(_id).then((user) => {
    //     console.log(user)
    //     if(!user){
    //         return res.status(404).send()
    //     }
    //     res.send(user)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

app.post('/task',async(req,res)=>{
     const task = new Task(req.body)
    try{
        await task.save()
        res.status(201).send(task)
    }
    catch(e){
        res.status(500).send(e)
    }
    // const task = new Task(req.body)
    // task.save().then(()=>{
    //     res.status(201).send(task)
    //     console.log(task)
    // }).catch((e)=>{
    //     res.status(400).send(e)
    // })
})
app.get('/task',async(req,res)=>{
    try{
    const tasks = await Task.find({})
    res.status(201).send(tasks)}
    catch(e){
        res.status(400).send()}
    // Task.find({}).then((tasks)=>{
    //     res.send(tasks)
    // }).catch((e)=>{
    //     res.status(500).send(e)
    // })
})
app.get('/task/:id',async(req,res)=>{
    const _id = req.params.id
    try{
        const task = await Task.findById(_id)
        if(!task){
            return res.status(404).send()
             }
           res.send(task)  
    }
    catch(e){
        res.status(400).send()
    }

    // const _id = req.params.id
    // console.log(_id)
    // Task.findById(_id).then((task) => {
    //     console.log(task)
    //     if(!task){
    //         return res.status(404).send()
    //     }
    //     res.send(task)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // }) 
})
app.listen(port,()=>{
    console.log('server is  up on port ' + port)
})